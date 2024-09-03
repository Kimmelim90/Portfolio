import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import {readFile, writeFile} from 'node:fs/promises'


const app = new Hono();

app.use("/*", cors());

app.use("/statics/*", serveStatic({ root: "./" }));

app.get("/json", async (c) => {
  const fileName = "projects.json";
  try {    
    const data = await readFile(`assets/${fileName}`, "utf-8");
    return c.json(JSON.parse(data));
  } catch (err) {
    console.error(`Error reading: ${fileName}`, err);
    return c.text(`Failed to read: ${fileName}`, 500);
  }
});

//Working together with Martine Müller and Phillip Nguyen, which might lead to similar code
app.post("/postjson", async (c) => {
  const fileName = "projects.json";
  let tempdata;
  try {
    
    const data = await readFile(`assets/${fileName}`, "utf-8");
    tempdata = JSON.parse(data);
  } catch (err) {
    console.error(`Error reading: ${fileName}`, err);
    return c.text(`Failed to read: ${fileName}`, 500);
  }

  // Setting body to be the JSON Data from the request
  const body = await c.req.json();
  // Making a new key to the JSON file, using the data from the form
  tempdata[Object.keys(body)[0]] = body[Object.keys(body)[0]];
  // Convert the new Data to a JSON object
  const newData = JSON.stringify(tempdata, null, 2);
  // Writing the New Data to the JSON File
  try {
    await writeFile("assets/projects.json", newData, "utf-8");
    console.log('Insert Successful');
  } catch (err) {
    console.error(`Error readiting to: ${fileName}:`, err);
    return c.text(`Failed to write to: ${fileName}`, 500);
  }

  return c.text('Created!', 201);
});

const port = 3999;

console.log("Server is running YEAH");

serve({
  fetch: app.fetch,
  port,
});