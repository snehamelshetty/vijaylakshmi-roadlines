import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // AuthN: require a JWT
    const authHeader = req.headers.get("Authorization") ?? "";
    const token = authHeader.replace(/^Bearer\s+/i, "");
    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabaseUser = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
    const { data: userData, error: userErr } = await supabaseUser.auth.getUser(token);
    if (userErr || !userData?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { booking_id } = await req.json();

    if (!booking_id) {
      return new Response(
        JSON.stringify({ error: "booking_id is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseAdmin = createClient(
      supabaseUrl,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // AuthZ: caller must be the booking owner OR an admin
    const { data: isAdmin } = await supabaseUser.rpc("has_role", {
      _user_id: userData.user.id,
      _role: "admin",
    });
    if (!isAdmin) {
      const { data: ownerCheck } = await supabaseAdmin
        .from("bookings")
        .select("user_id")
        .eq("id", booking_id)
        .maybeSingle();
      if (!ownerCheck || ownerCheck.user_id !== userData.user.id) {
        return new Response(JSON.stringify({ error: "Forbidden" }), {
          status: 403,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    const { data: booking, error: fetchError } = await supabaseAdmin
      .from("bookings")
      .select("*")
      .eq("id", booking_id)
      .single();

    if (fetchError || !booking) {
      return new Response(
        JSON.stringify({ error: "Booking not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!booking.customer_email) {
      return new Response(
        JSON.stringify({ message: "No customer email, skipping" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const emailHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; background: #f4f4f5; padding: 40px 0;">
  <div style="max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
    <div style="background: #1e3a5f; padding: 24px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 22px;">VRL Logistics</h1>
      <p style="color: #94a3b8; margin: 4px 0 0; font-size: 13px;">Booking Confirmation</p>
    </div>
    <div style="padding: 32px 24px;">
      <p style="margin: 0 0 16px; color: #334155;">Dear <strong>${booking.customer_name}</strong>,</p>
      <p style="margin: 0 0 24px; color: #334155;">Your booking has been confirmed! Here are the details:</p>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr><td style="padding: 10px 12px; background: #f8fafc; color: #64748b; font-size: 13px; border-bottom: 1px solid #e2e8f0;">Tracking ID</td><td style="padding: 10px 12px; background: #f8fafc; font-weight: 700; color: #1e293b; border-bottom: 1px solid #e2e8f0;">${booking.tracking_id}</td></tr>
        <tr><td style="padding: 10px 12px; color: #64748b; font-size: 13px; border-bottom: 1px solid #e2e8f0;">Pickup</td><td style="padding: 10px 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">${booking.pickup_location}</td></tr>
        <tr><td style="padding: 10px 12px; background: #f8fafc; color: #64748b; font-size: 13px; border-bottom: 1px solid #e2e8f0;">Delivery</td><td style="padding: 10px 12px; background: #f8fafc; color: #1e293b; border-bottom: 1px solid #e2e8f0;">${booking.delivery_location}</td></tr>
        <tr><td style="padding: 10px 12px; color: #64748b; font-size: 13px; border-bottom: 1px solid #e2e8f0;">Truck Type</td><td style="padding: 10px 12px; color: #1e293b; border-bottom: 1px solid #e2e8f0;">${booking.truck_type}</td></tr>
        <tr><td style="padding: 10px 12px; background: #f8fafc; color: #64748b; font-size: 13px; border-bottom: 1px solid #e2e8f0;">Pickup Date</td><td style="padding: 10px 12px; background: #f8fafc; color: #1e293b; border-bottom: 1px solid #e2e8f0;">${booking.pickup_date}</td></tr>
        <tr><td style="padding: 10px 12px; color: #64748b; font-size: 13px; border-bottom: 1px solid #e2e8f0;">Status</td><td style="padding: 10px 12px; color: #16a34a; font-weight: 600; border-bottom: 1px solid #e2e8f0;">Booked ✓</td></tr>
      </table>
      <p style="margin: 0 0 8px; color: #64748b; font-size: 13px;">Use your Tracking ID to check shipment status anytime.</p>
      <p style="margin: 0; color: #64748b; font-size: 13px;">Thank you for choosing VRL Logistics!</p>
    </div>
    <div style="background: #f8fafc; padding: 16px 24px; text-align: center;">
      <p style="margin: 0; color: #94a3b8; font-size: 12px;">© ${new Date().getFullYear()} VRL Logistics. All rights reserved.</p>
    </div>
  </div>
</body>
</html>`;

    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!lovableApiKey) {
      console.error("LOVABLE_API_KEY not set");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const emailResponse = await fetch("https://api.lovable.dev/api/v1/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${lovableApiKey}`,
      },
      body: JSON.stringify({
        to: booking.customer_email,
        subject: `Booking Confirmed — ${booking.tracking_id} | VRL Logistics`,
        html: emailHtml,
        purpose: "transactional",
      }),
    });

    const emailResult = await emailResponse.text();
    console.log("Email API response:", emailResponse.status, emailResult);

    if (!emailResponse.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: emailResult }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Booking confirmation sent" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
