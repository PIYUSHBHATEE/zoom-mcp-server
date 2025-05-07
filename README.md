# Zoom MCP Server

A Model Context Protocol (MCP) server for managing Zoom meetings via Claude or Cursor.

This server enables you to **create**, **update**, **delete**, and **retrieve** Zoom meetings using a standardized MCP interface, making it easy to integrate with AI tools like Claude and Cursor.

---

## ⚙️ Claude / Cursor Configuration

To use this MCP server with Claude or Cursor, add the following to your MCP config file( Claude: `claude_desktop_config.json` | Cursor: `.cursor/mcp.json` ):

```json
{
  "mcpServers": {
    "zoom": {
      "command": "npx",
      "args": [
        "-y", "@prathamesh0901/zoom-mcp-server"
      ],
      "env": {
        "ZOOM_ACCOUNT_ID": "Your Zoom Account ID",
        "ZOOM_CLIENT_ID": "Your Zoom Client ID",
        "ZOOM_CLIENT_SECRET": "Your Zoom Client Secret"
      }
    }
  }
}
```

> 🛡️ Replace the credentials with your Zoom App credentials created on the Zoom Marketplace.

---

## 🛠 Features

| Tool           | Description                        |
|----------------|------------------------------------|
| `get_meetings` | Retrieve all active Zoom meetings  |
| `create_meeting` | Create a new Zoom meeting       |
| `update_meeting` | Update an existing meeting       |
| `delete_meeting` | Delete a Zoom meeting            |

Each tool is implemented using Zod schema validation for parameters.

---

## 🧑‍💻 Local Development

Clone the repo:

```bash
git clone https://github.com/Prathamesh0901/zoom-mcp-server.git
cd zoom-mcp-server
```

Install dependencies:

```bash
npm install
```

Run in development mode:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run the compiled server:

```bash
npm start
```

---

## 🤝 Contributing

Contributions are welcome and appreciated! To contribute:

1. Fork the repository  
2. Create a new branch:  
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit:  
   ```bash
   git commit -m "Add some feature"
   ```
4. Push to your fork and open a pull request.

---

## 📄 License

This project is licensed under the MIT License.