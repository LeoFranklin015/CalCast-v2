import { Button } from "frames.js/next";
import { frames } from "../frames";

const handleRequest = frames(async (ctx) => {
  return {
    image: (
      <div tw="flex">Transaction submitted! {ctx.message?.transactionId}</div>
    ),
    buttons: [
      <Button
        key={1}
        action="link"
        target={`https://www.onceupon.gg/tx/${ctx.message?.transactionId}`}
      >
        View on block explorer
      </Button>,
    ],
  };
});
