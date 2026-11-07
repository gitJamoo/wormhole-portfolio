"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import posthog from "posthog-js";

export default function Book() {
    useEffect(() => {
        (async function () {
            const cal = await getCalApi({});
            cal("ui", {
                styles: { branding: { brandColor: "#000000" } },
                hideEventTypeDetails: false,
                layout: "month_view",
            });
            cal("on", {
                action: "bookingSuccessful",
                callback: () => posthog.capture("meeting_booked"),
            });
        })();
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center p-4 sm:p-8">
            <div className="w-full max-w-5xl bg-card rounded-xl shadow-lg overflow-hidden border border-border">
                <Cal
                    calLink="james-smith-e4rbyn"
                    style={{ width: "100%", height: "100%", minHeight: "700px", overflow: "scroll" }}
                    config={{ layout: "month_view" }}
                />
            </div>
        </div>
    );
}
