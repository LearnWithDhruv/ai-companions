"use client";

import { useState } from "react";
import { useToast } from "./ui/use-toast";
import axios from "axios";
import { Sparkles } from "lucide-react";
import { Button } from "./ui/button";
export const SubscriptionButton = ({
    isPro = false
}: {
    isPro: boolean;
}) => {
    const {toast} = useToast();
    const [loading, setLoading] = useState(false);

    const onClick = async () => {
        try {
            setLoading(true)
            
            const response = await axios.get("/api/stripe");
// This will throw the user to some another url other than on which the app is running.
            window.location.href = response.data.url;
        } catch (error) {
            toast({
                description: "Something went wrong",
                variant:"destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button size="sm" variant={isPro ? "default" : "premium"} disabled={loading} onClick={onClick}>
            {isPro ? "Manage Subscription": "Upgrade"}
            {!isPro && <Sparkles className="w-4 h-4 ml-2 fill-white" />}
        </Button>
    )
}