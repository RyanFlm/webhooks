import { Router } from 'express';
import axios from 'axios';
import * as wol from "wake_on_lan";

const router = Router();

router.get('/', (req, res) => {
  let ret = {
    error: "",
    message: ""
  };

  if(req.query.key !== process.env.AUTH_KEY) ret.error = "Wrong auth key";
  else {
    switch (req.query.f) {
      case "start":
        wol.wake(process.env.MAC_ADDRESS, { address: process.env.BROADCAST_IP }, e => e ? console.error(e) : console.log("Magic packet sent successfully"));
        ret.message = "PC is waking up";
        break;
      case "stop":
        axios.get(`http://${process.env.IP_ADDRESS}:7760/poweroff`).then(console.log).catch(e => console.log(e.code === 'HPE_INVALID_CONSTANT' ? 'Malformed Answer' : e));
        ret.message = "PC is going to sleep";
        break;
      default:
        ret.error = "Function unknown"
    }
  }

  res.json(ret);
})

export default router;
