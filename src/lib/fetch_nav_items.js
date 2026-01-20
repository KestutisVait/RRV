import axios from "axios";

export async function getNavItems() {
  const res = await axios.get(`${process.env.HOST_URL}/data/nav.json`);
  // console.log(res.data);
  
  return res.data;
}
