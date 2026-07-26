"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  MessageSquare,
  Home,
  Eye,
  EyeOff,
  RefreshCw,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { apiCall } from "@/lib/config";

// Your API key - keep this secret!
const ADMIN_API_KEY = "wedding-admin-2025-secure-ag_srujana";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showApiKey, setShowApiKey] = useState(false);
  const [activeTab, setActiveTab] = useState("stats");

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiCall("/api/admin/all-data", {
        headers: {
          "x-api-key": ADMIN_API_KEY,
        },
      });

      setData(result);
      console.log("Admin data loaded:", result);
    } catch (err) {
      setError(err.message);
      console.error("Failed to fetch admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "attending":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle size={12} className="mr-1" />
            Attending
          </Badge>
        );
      case "not-attending":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle size={12} className="mr-1" />
            Not Attending
          </Badge>
        );
      case "unread":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <AlertCircle size={12} className="mr-1" />
            Unread
          </Badge>
        );
      case "read":
        return (
          <Badge className="bg-gray-100 text-gray-800">
            <Eye size={12} className="mr-1" />
            Read
          </Badge>
        );
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
          <p className="text-gray-600">Loading admin data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Access Error</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={fetchData} className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Wedding Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage RSVPs, accommodations, and messages
          </p>

          {/* API Key Display */}
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-800">API Key:</p>
                <code className="text-sm text-yellow-700">
                  {showApiKey ? ADMIN_API_KEY : "•".repeat(20)}
                </code>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {data?.stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Users className="w-8 h-8 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Total RSVPs
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {data.stats.totalRSVPs}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <CheckCircle className="w-8 h-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Attending
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {data.stats.attendingGuests}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Home className="w-8 h-8 text-purple-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Accommodation Requests
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {data.stats.totalAccommodationRequests}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <MessageSquare className="w-8 h-8 text-orange-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">
                      Messages
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {data.stats.totalMessages}
                      {data.stats.unreadMessages > 0 && (
                        <span className="ml-2 text-sm text-red-500">
                          ({data.stats.unreadMessages} unread)
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="mb-6">
          <nav className="flex space-x-4">
            {[
              { id: "stats", label: "Statistics", icon: <Users size={16} /> },
              { id: "rsvps", label: "RSVPs", icon: <CheckCircle size={16} /> },
              {
                id: "accommodations",
                label: "Accommodations",
                icon: <Home size={16} />,
              },
              {
                id: "messages",
                label: "Messages",
                icon: <MessageSquare size={16} />,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {tab.icon}
                <span className="ml-2">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Refresh Button */}
        <div className="mb-6">
          <Button onClick={fetchData} disabled={loading}>
            <RefreshCw
              className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Refresh Data
          </Button>
        </div>

        {/* Tab Content */}
        {data && (
          <div>
            {/* Statistics Tab */}
            {activeTab === "stats" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Event Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Object.entries(data.stats.eventBreakdown || {}).map(
                      ([eventId, stats]) => (
                        <div key={eventId} className="p-4 border rounded-lg">
                          <h4 className="font-semibold mb-2 capitalize">
                            {eventId.replace("-", " ")}
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Accommodations:</span>
                              <span className="font-medium">
                                {stats.accommodations}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>RSVPs:</span>
                              <span className="font-medium">{stats.rsvps}</span>
                            </div>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* RSVPs Tab */}
            {activeTab === "rsvps" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    RSVPs ({data.data.rsvps.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left font-medium text-gray-900">
                            Guest Name
                          </th>
                          <th className="px-4 py-3 text-left font-medium text-gray-900">
                            Status
                          </th>
                          <th className="px-4 py-3 text-left font-medium text-gray-900">
                            Events
                          </th>
                          <th className="px-4 py-3 text-left font-medium text-gray-900">
                            Submitted
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {data.data.rsvps.map((rsvp) => (
                          <tr key={rsvp.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 font-medium text-gray-900">
                              {rsvp.guest_name}
                            </td>
                            <td className="px-4 py-3">
                              {getStatusBadge(rsvp.status)}
                            </td>
                            <td className="px-4 py-3">
                              <div className="space-y-1">
                                {rsvp.selected_events.map((event) => (
                                  <Badge
                                    key={event}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {event.replace("-", " ")}
                                  </Badge>
                                ))}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-gray-600">
                              {formatDate(rsvp.created_at)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Accommodations Tab */}
            {activeTab === "accommodations" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Home className="w-5 h-5 mr-2" />
                    Accommodation Requests ({data.data.accommodations.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left font-medium text-gray-900">
                            Guest Name
                          </th>
                          <th className="px-4 py-3 text-left font-medium text-gray-900">
                            Events
                          </th>
                          <th className="px-4 py-3 text-left font-medium text-gray-900">
                            Status
                          </th>
                          <th className="px-4 py-3 text-left font-medium text-gray-900">
                            Requested
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {data.data.accommodations.map((acc) => (
                          <tr key={acc.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 font-medium text-gray-900">
                              {acc.guest_name}
                            </td>
                            <td className="px-4 py-3">
                              <div className="space-y-1">
                                {acc.selected_events.map((event) => (
                                  <Badge
                                    key={event}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {event.replace("-", " ")}
                                  </Badge>
                                ))}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              {getStatusBadge(acc.status)}
                            </td>
                            <td className="px-4 py-3 text-gray-600">
                              {formatDate(acc.created_at)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Messages Tab */}
            {activeTab === "messages" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Messages ({data.data.messages.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.data.messages.map((message) => (
                      <div
                        key={message.id}
                        className="p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">
                              {message.guest_name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {formatDate(message.created_at)}
                            </p>
                          </div>
                          {getStatusBadge(message.status)}
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                          {message.message}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
