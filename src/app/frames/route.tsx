/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";
import { getProfileData } from "@/lib/getProfileData";
import { Landing } from "@/components/frames/Landing";

const handleRequest = frames(async (ctx: any) => {
  const encodedString = ctx.searchParams["fid"].toString();
  const decodedString = atob(encodedString);
  const decodedJSON = JSON.parse(decodedString);
  const ownerFID = decodedJSON.fid;
  const duration = decodedJSON.duration;

  const data = await getProfileData(ownerFID);

  const ownerName = data.Socials.Social[0].profileName;
  const ownerimg = data.Socials.Social[0].profileImage;
  const ownerbio = data.Socials.Social[0].profileBio;

  return {
    image: (
      <Landing ownerName={ownerName} duration={duration} ownerimg={ownerimg} />
    ),
    buttons: [
      <Button
        action="post"
        target={`/bookings?fid=${ctx.searchParams[
          "fid"
        ].toString()}&ownerName=${ownerName}&ownerimg=${ownerimg}&d=0`}
      >
        Book now
      </Button>,
      <Button action="link" target="https://calcast.vercel.app">
        My CalFrame
      </Button>,
    ],
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
