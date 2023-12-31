import { openai } from "../constants/api.js";

export const chatWait = async (req, res) => {
   try {
      const { txt } = req.body;
      let completion = await openai.createChatCompletion({
         model: "gpt-3.5-turbo",
         messages: [{ role: "user", content: txt }],
      });
      console.log(completion.data.choices[0]);
      res.send(completion.data.choices[0]);
   } catch (err) {
      console.log(err);
      res.send("Error");
   }
};

export const chatStream = async (req, res) => {
   try {
      const { txt } = req.body;
      res.setHeader("Content-Type", "text/plain");
      res.setHeader("Transfer-Encoding", "chunked");

      const resp = await api.sendMessage(txt, {
         // print the partial response as the AI is "typing"
         onProgress: (partialResponse) => res.write(partialResponse.text),
      });

      // End the response
      res.end();
      console.log(resp.text);
   } catch (err) {
      console.log(err);
      res.send("Error");
   }
};

export const chatFollowUp = async (req, res) => {
   try {
      const { txt, id } = req.body;
      console.log(txt, id);
      let resp = await api.sendMessage(txt, {
         parentMessageId: id,
      });
      console.log(resp.text);
      res.send(resp.text);
   } catch (err) {
      console.log(err);
      res.send("Error");
   }
};
