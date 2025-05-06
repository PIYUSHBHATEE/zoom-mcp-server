# ✅ Zoom MCP Feature Checklist with Details

## 🟢 Core Meeting Management

- [ ] **Create a Zoom Meeting**
  - Includes: topic, start time, duration, timezone, meeting type (scheduled/instant), video (host/participant), join_url
  - Optional: password, waiting room, host email

- [ ] **Update a Zoom Meeting**
  - Includes: topic, start time, duration, timezone
  - Optional: video settings, recurrence (for recurring meetings)
  - Exclude: meeting type (cannot change instant to scheduled)

- [ ] **Delete a Zoom Meeting**
  - Includes: meeting ID, optional `schedule_for_removal` flag
  - Should handle non-existent meetings gracefully

- [ ] **Fetch Meetings by Date**
  - Includes: from, to (ISO format)
  - Optional: status filter (scheduled/live)

- [ ] **Fetch Next Upcoming Meeting**
  - Includes: current time comparison, returns earliest upcoming scheduled meeting

- [ ] **Fetch Meeting Details by ID**
  - Includes: topic, time, participants, join_url, settings
  - Optional: agenda, recurrence details

- [ ] **End a Live Meeting**
  - Includes: meeting ID
  - Only applicable for meetings currently in progress

---

## 👥 Meeting Participants (Optional)

- [ ] **Add Registrants to a Meeting**
  - Includes: name, email, meeting ID
  - Optional: custom questions/fields

- [ ] **List Registrants of a Meeting**
  - Includes: meeting ID
  - Optional: approval status (approved/denied)

- [ ] **Get Past Meeting Participants**
  - Includes: meeting UUID
  - Requires: Zoom Pro or higher

---

## 👤 User Info & Settings

- [ ] **Get Current User Info**
  - Includes: ID, email, type, timezone, created_at

- [ ] **Get User Zoom Settings**
  - Includes: default meeting settings (video, audio, auto_recording)
  - Optional: notification preferences

- [ ] **Update User Default Meeting Settings**
  - Includes: video on/off, host join before, waiting room
  - Should be scoped by user token

---

## 📼 Recordings

- [ ] **List Cloud Recordings**
  - Includes: user ID/date range, meeting ID
  - Optional: page_size/page_token

- [ ] **Get Recording Playback Link**
  - Includes: meeting UUID, recording file ID
  - Optional: password if protected

- [ ] **Delete a Recording**
  - Includes: meeting UUID, recording file ID

---

## 🧑‍🏫 Webinars (Optional)

- [ ] **Create a Webinar**
  - Includes: topic, start time, duration, timezone
  - Requires: webinar license

- [ ] **Update a Webinar**
  - Same as meeting update: topic, time, duration

- [ ] **List Upcoming Webinars**
  - Includes: host email/user ID

- [ ] **Register User to Webinar**
  - Includes: webinar ID, name, email

---

## 💬 Chat (Optional/Advanced)

- [ ] **Send a Message**
  - Includes: recipient (user/channel), message
  - Optional: thread_id for replies

- [ ] **Fetch Recent Chat Messages**
  - Includes: channel ID, time range
  - Requires: chat scopes and Pro+ plan

- [ ] **List Chat Channels**
  - Includes: user ID or default channels

---

## 📊 Reports & Analytics

- [ ] **Get Daily Usage Reports**
  - Includes: date range
  - Only for Business+ accounts

- [ ] **Get Meeting QoS Reports**
  - Includes: meeting ID or UUID

- [ ] **Get Webinar Q&A or Poll Results**
  - Includes: webinar ID

---

## 🛠️ Admin Tools (Zoom Admin API Only)

- [ ] **List Users**
  - Includes: status filter, pagination
  - Admin-only

- [ ] **Create/Delete Users**
  - Includes: email, type (basic/licensed)
  - Requires admin token

- [ ] **Update User Roles or Licenses**
  - Includes: user ID, role ID or plan type

- [ ] **Get Account Settings**
  - Includes: global defaults for meetings/webinars/recordings

---

## 🤖 MCP-Specific Features

- [ ] **Normalize Date Inputs**
  - Converts "tomorrow at 4PM" → ISO 8601 format
  - Required for LLM-to-Zoom compatibility

- [ ] **Token Refresh Support**
  - Ensure automatic refreshing of Zoom OAuth tokens
  - Must securely store refresh tokens per user

- [ ] **Per-user Authentication**
  - Supports OAuth 2.0 login and grants for each Zoom user

- [ ] **Tool Interface for Claude**
  - Expose each Zoom API action as a tool function
  - Use JSON schema for argument validation

- [ ] **Rate Limiting/Error Handling**
  - Handle 429 (rate limit) and 4xx/5xx gracefully
  - Include retries and fallbacks

- [ ] **Logging + Monitoring**
  - Include logging for all API calls and responses
  - Optional: latency tracking and alerts
