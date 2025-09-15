import axios from "axios";

export async function getNavItems() {
  const res = await axios.get('http://localhost:3000/data/nav.json');
  // console.log(res.data);
  
  return res.data;
}
