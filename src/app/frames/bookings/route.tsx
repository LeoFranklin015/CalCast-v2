import { Button } from "frames.js/next";
import { frames } from "../frames";
import { getNextSixDates } from "@/lib/date";
import { Date } from "@/components/frames/Date";
import { createTimeSlots, gettimeslot } from "@/lib/time";
import { Time } from "@/components/frames/Time";
import { Confirm } from "@/components/frames/Confirm";
import {
  FrameRatio,
  generateCaptchaChallenge,
  GenerateCaptchaChallengeInput,
  GenerateCaptchaChallengeOutput,
  validateCaptchaChallenge,
  ValidateCaptchaChallengeInput,
  ValidateCaptchaChallengeOutput,
} from "@airstack/frames";

const handleRequest = frames(async (ctx) => {
  const encodedString = ctx.searchParams["fid"].toString();
  const decodedString = atob(encodedString);
  const decodedJSON = JSON.parse(decodedString);
  const ownerFID = decodedJSON.fid;
  const duration = decodedJSON.duration;
  const ownerName = ctx.searchParams["ownerName"];
  const ownerimg = ctx.searchParams["ownerimg"];
  const dates = getNextSixDates();

  const d = ctx.searchParams["d"];
  const t = ctx.searchParams["t"];
  if (ctx.searchParams["datefixed"] == undefined) {
    return {
      image: (
        <Date
          ownerName={ownerName}
          duration={duration}
          ownerimg={ownerimg}
          dates={dates}
          d={d}
        />
      ),
      buttons: [
        <Button
          key={1}
          action="post"
          target={`/bookings?fid=${ctx.searchParams[
            "fid"
          ].toString()}&ownerName=${ownerName}&ownerimg=${ownerimg}&d=${
            d == "0" ? "6" : (parseInt(d) - 1).toString()
          }`}
        >
          ⬅️
        </Button>,
        <Button
          key={2}
          action="post"
          target={`/bookings?fid=${ctx.searchParams[
            "fid"
          ].toString()}&ownerName=${ownerName}&ownerimg=${ownerimg}&d=${d}&datefixed=true&t=0`}
        >
          {`${dates[parseInt(d)]} July`}
        </Button>,
        <Button
          key={3}
          action="post"
          target={`/bookings?fid=${ctx.searchParams[
            "fid"
          ].toString()}&ownerName=${ownerName}&ownerimg=${ownerimg}&d=${
            d == "6" ? "0" : (parseInt(d) + 1).toString()
          }`}
        >
          ➡️
        </Button>,
      ],
    };
  } else if (ctx.searchParams["timefixed"] == undefined) {
    const t = ctx.searchParams["t"].toString();
    const timeSlots = await gettimeslot(ownerFID);
    const timeslots = createTimeSlots(timeSlots);
    console.log(timeslots);
    const visibleIndex = Math.floor(parseInt(t) / 5);

    const startIndex = visibleIndex * 5;
    const endIndex = Math.min(startIndex + 5, timeslots.length);
    const visibleTimeSlots = timeslots.slice(startIndex, endIndex);
    return {
      image: (
        <Time
          ownerName={ownerName}
          ownerimg={ownerimg}
          duration={duration}
          visibleTimeSlots={visibleTimeSlots}
          t={t}
        />
      ),
      buttons: [
        <Button
          key={1}
          action="post"
          target={`/bookings?fid=${ctx.searchParams[
            "fid"
          ].toString()}&ownerName=${ownerName}&ownerimg=${ownerimg}&d=${d}`}
        >
          Go Back
        </Button>,
        <Button
          key={2}
          action="post"
          target={`/bookings?fid=${ctx.searchParams[
            "fid"
          ].toString()}&ownerName=${ownerName}&ownerimg=${ownerimg}&d=${d}&datefixed=true&t=${
            t == "0"
              ? (timeslots.length - 1).toString()
              : (parseInt(t) - 1).toString()
          }`}
        >
          ⬅️
        </Button>,
        <Button
          key={3}
          action="post"
          target={`/bookings?fid=${ctx.searchParams[
            "fid"
          ].toString()}&ownerName=${ownerName}&ownerimg=${ownerimg}&d=${d}&datefixed=true&t=${t}&timefixed=true`}
        >
          {`${timeslots[parseInt(t)]}`}
        </Button>,
        <Button
          key={4}
          action="post"
          target={`/bookings?fid=${ctx.searchParams[
            "fid"
          ].toString()}&ownerName=${ownerName}&ownerimg=${ownerimg}&d=${d}&datefixed=true&t=${
            t == (timeslots.length - 1).toString()
              ? "0"
              : (parseInt(t) + 1).toString()
          }`}
        >
          ➡️
        </Button>,
      ],
    };
  } else if (ctx.searchParams["captcha"] == undefined) {
    const input: GenerateCaptchaChallengeInput = {
      options: { ratio: FrameRatio._1_91__1, includeImage: true },
    };

    const res: GenerateCaptchaChallengeOutput = await generateCaptchaChallenge(
      input
    );
    return {
      image: (
        <div style={{ display: "flex" }}>
          <img src={res.image}></img>
        </div>
      ),
      state: {
        captchaId: res.state.captchaId,
        valueHash: res.state.valueHash,
      },

      buttons: [
        <Button
          key={1}
          action="post"
          target={`/bookings?fid=${ctx.searchParams[
            "fid"
          ].toString()}&ownerName=${ownerName}&ownerimg=${ownerimg}&d=${d}&datefixed=true&t=${t}&timefixed=true&captcha=pending&captchaId=${
            res.state.captchaId
          }&hashvalue=${res.state.valueHash}`}
        >
          Verify
        </Button>,
      ],
      textInput: "Enter the answer",
    };
  } else if (ctx.searchParams["captcha"] == "pending") {
    const inputText = ctx.message!.inputText || "";
    const states = ctx.message!.state;

    const state = {
      captchaId: ctx.searchParams["captchaId"],
      valueHash: ctx.searchParams["hashvalue"],
    };

    console.log(`state : ${state}`);

    const input: ValidateCaptchaChallengeInput = {
      inputText,
      state,
    };

    const res: ValidateCaptchaChallengeOutput = await validateCaptchaChallenge(
      input
    );
    return {
      image: (
        <div style={{ display: "flex" }}>
          <img src={res.image}></img>
        </div>
      ),
      buttons: [
        <Button
          key={1}
          action="post"
          target={
            res.isValidated
              ? `/bookings?fid=${ctx.searchParams[
                  "fid"
                ].toString()}&ownerName=${ownerName}&ownerimg=${ownerimg}&d=${d}&datefixed=true&t=${t}&timefixed=true&captcha=verified`
              : `/bookings?fid=${ctx.searchParams[
                  "fid"
                ].toString()}&ownerName=${ownerName}&ownerimg=${ownerimg}&d=${d}&datefixed=true&t=${t}&timefixed=true`
          }
        >
          {res.isValidated ? "Proceed" : "Try again!"}
        </Button>,
      ],
    };
  } else if (ctx.searchParams["confirm"] == undefined) {
    const timeSlots = await gettimeslot(ownerFID);
    const timeslots = createTimeSlots(timeSlots);
    return {
      image: (
        <Confirm
          ownerName={ownerName}
          duration={duration}
          ownerimg={ownerimg}
          dates={dates}
          d={d}
          t={t}
          timeslots={timeslots}
        />
      ),
      buttons: [
        <Button
          key={1}
          action="post"
          target={`/bookings?fid=${ctx.searchParams[
            "fid"
          ].toString()}&ownerName=${ownerName}&ownerimg=${ownerimg}&d=${d}&datefixed=true&t=${t}`}
        >
          Go back
        </Button>,
        <Button
          key={2}
          action="tx"
          target={`/txdata?fid=${ctx.searchParams[
            "fid"
          ].toString()}&ownerName=${ownerName}&ownerimg=${ownerimg}&d=${d}&datefixed=true&t=${t}&timefixed=true&confirm=true&userfid=${
            ctx.message!.requesterFid
          }&owner=${ownerFID}&duration=${duration}`}
          post_url={`/tx-success`}
        >
          Confirm
        </Button>,
      ],
    };
  } else {
    return {
      image: (
        <Date
          ownerName={ownerName}
          duration={duration}
          ownerimg={ownerimg}
          dates={dates}
          d={d}
        />
      ),
      buttons: [
        <Button
          key={1}
          action="post"
          target={`/bookings?fid=${ctx.searchParams[
            "fid"
          ].toString()}&ownerName=${ownerName}&ownerimg=${ownerimg}&d=${
            d == "0" ? "6" : (parseInt(d) - 1).toString()
          }`}
        >
          ⬅️
        </Button>,
        <Button
          key={2}
          action="post"
          target={`/bookings?fid=${ctx.searchParams[
            "fid"
          ].toString()}&ownerName=${ownerName}&ownerimg=${ownerimg}&d=${d}&datefixed=false`}
        >
          {`Change Date`}
        </Button>,
        <Button
          key={3}
          action="post"
          target={`/bookings?fid=${ctx.searchParams[
            "fid"
          ].toString()}&ownerName=${ownerName}&ownerimg=${ownerimg}&d=${
            d == "6" ? "0" : (parseInt(d) + 1).toString()
          }`}
        >
          ➡️
        </Button>,
      ],
    };
  }
});

export const POST = handleRequest;
