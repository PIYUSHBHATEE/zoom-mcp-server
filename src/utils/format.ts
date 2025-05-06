import { meetInterface, newMeetingParams } from "./types.js";

export function formatMeet(meet: meetInterface): string {
    return [
        `Id: ${meet.id || "Unknown"}`,
        `Topic: ${meet.topic || "Unknown"}`,
        `Start Time: ${meet.start_time || "Unknown"}`,
        `Duration: ${meet.duration || "Unknown"}`,
        `Time Zone: ${meet.timezone || "Unknown"}`,
        `Join Url: ${meet.join_url || "Unknown"}`,
        `Password: ${meet.password || "Unknown"}`,
        "---",
    ].join("\n");
}

export function formatCreateMeet(params: newMeetingParams) {
    return [
        `Topic: ${params.topic || "Unknown" }`,
        `Start Time: ${params.start_time || "Unknown" }`,
        `Duration: ${params.duration || "Unknown" }`,
        `Time Zone: ${params.timezone || "Unknown" }`,
        `Agenda: ${params.agenda || "Unknown" }`,
        `Join Url: ${params.join_url || "Unknown" }`,
        `Password: ${params.password || "Unknown" }`,
    ].join("\n");
}