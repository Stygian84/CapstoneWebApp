// Change JSONurl accordingly

const config = {
  apiKey: "AIzaSyA_RjLDJT9H0kBejID55g95wzrxD--p-d4",
  fileId: "1hDb0k_XynB1L52muElngh-2xQp63S8p8",
};
const JSONurl = `https://www.googleapis.com/drive/v3/files/${config.fileId}?alt=media&key=${config.apiKey}`;

export default JSONurl;
