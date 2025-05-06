import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import get_meetings from "./tools/fetchMeetings.js";
import { formatCreateMeet, formatMeet } from "./utils/format.js";

import { createZoomMeeting } from "./tools/createMeeting.js";
import { newMeetingParams } from "./utils/types.js";
import { updateZoomMeeting } from "./tools/updateMeeting.js";
import { deleteZoomMeeting } from "./tools/deleteMeeting.js";

// Create an MCP server
const server = new McpServer({
  name: "zoom-mcp",
  version: "1.0.0"
});

// adding get_meeting tools
server.tool(
  "get_meetings",
  "get all my meetings",
  {

  },
  async ({}) => {
    const data = await get_meetings();

    if(!data) {
      return {
        content: [
          {
            type: "text",
            text: "Error fetching meetings"
          },
        ],
      };
    }

    const meetings = data.meetings || [];
    if(meetings.length == 0) {
      return {
        content: [
          {
            type: "text",
            text: "No active meetings"
          },
        ],
      };
    }

    const formattedMeetings = meetings.map(formatMeet);
    const allMeetings = `Active meetings: \n \n ${formattedMeetings.join("\n")}`;
    return {
      content: [
        {
          type: "text",
          text: allMeetings
        }
      ],
    };
  }
);

// adding create meeting tool
server.tool(
  "create_meeting", 
  "Create a new zoom meeting",
  {
    topic: z.string().describe("Topic for meeting."),
    start_time: z.string().describe("Meeting start time."),
    timezone: z.string().describe("Timezone for meeting time."),
    duration: z.number().min(0).describe("Duration of meeting."),
    agenda: z.string().describe("Agenda for the meet."),
  },
  async (params) => {
    let data = await createZoomMeeting(params);

    if(!data) {
      return {
        content: [
          {
            type: "text",
            text: "Error creating new meeting!"
          },
        ],
      };
    }

    const meetingCredentials: newMeetingParams = {
      topic: data.topic,
      start_time: data.start_time,
      duration: data.duration,
      timezone: data.timezone,
      join_url: data.join_url,
      password: data.password,
      agenda: data.agenda || ''
    }
    const formattedCredentials = formatCreateMeet(meetingCredentials);
    const finalResponse = `Created new meet with these credentials: \n\n ${formattedCredentials} `;

    return {
      content: [
        {
          type: "text",
          text: finalResponse
        },
      ],
    };
  }
);

// adding update meeting tool
server.tool(
  "update_meeting",
  "update existing meeting",
  {
    id: z.string().describe("id of the meeting to be updated."),
    topic: z.string().describe("updated topic of meeting"),
    start_time: z.string().describe("updated start time of meeting"),
    duration: z.number().describe("updated duration of meeting"),
    timezone: z.string().describe("updated timezone of meeting"),
    agenda: z.string().describe("updated agenda of meeting"),
  },
  async (params) => {
    const data = await updateZoomMeeting(params);

    if(!data || !data.success) {
      return {
        content: [
          {
            type: "text",
            text: "Error updating the meeting",
          },
        ],
      };
    }  

    const formattedResponse = `{success: ${data.success}}`;

    return {
      content: [
        {
          type: "text",
          text: formattedResponse
        },
      ],
    };
  }
);

// adding delete meeting tool
server.tool(
  "delete_meeting",
  "delete existing meeting",
  {
    id: z.string().describe("id of meeting to be deleted"),
  },
  async (params) => {
    const data = await deleteZoomMeeting(params);

    if(!data || !data.success) {
      return {
        content: [
          {
            type: "text",
            text: "Error updating the meeting",
          },
        ],
      };
    }  

    const formattedResponse = `{success: ${data.success}}`;

    return {
      content: [
        {
          type: "text",
          text: formattedResponse
        },
      ],
    };

  }
)

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Weather MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});