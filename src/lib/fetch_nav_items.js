import axios from "axios";

export async function getNavItems() {
  const res = await axios.get('https://rrv.onrender.com/data/nav.json');
  // console.log(res.data);
  
  return res.data;
}
