import { Button } from "frames.js/next";
import { frames } from "../frames";
import { getNextSixDates } from "@/lib/date";
import { Date } from "@/components/frames/Date";
import { createTimeSlots, gettimeslot } from "@/lib/time";

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
          action="post"
          target={`/bookings?fid=${ctx.searchParams[
            "fid"
          ].toString()}&ownerName=${ownerName}&ownerimg=${ownerimg}&d=${d}&datefixed=true&t=0`}
        >
          {`${dates[parseInt(d)]} July`}
        </Button>,
        <Button
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 64,
            // justifyContent: "center",

            width: "100%",
            height: "100%",
            backgroundColor: "black",
            padding: 70,
            fontSize: 24,
            fontFamily: "Montserrat",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  color: "white",
                  fontSize: 48,
                  fontFamily: "Montserrat",
                }}
              >
                {`CalCast/@${ownerName}`}
              </div>
              <div
                style={{
                  color: "white",
                  display: "flex",
                }}
              >
                <img
                  src={ownerimg}
                  width={92}
                  height={92}
                  alt="ownerImage"
                  style={{
                    borderRadius: "50%",
                    border: "2px solid white",
                  }}
                />
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              color: "white",
              fontSize: 52,
              fontStyle: "bold",
              marginTop: -40,
            }}
          >
            {duration} min
          </div>
          <div
            style={{
              display: "flex",
              color: "white",
              fontSize: 36,
              gap: 20,
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
              }}
            >
              Choose a time
            </div>
            <div
              style={{
                color: "white",
                display: "flex",
                gap: 35,
                alignItems: "center",
                justifyContent: "flex-start",
                marginTop: 10,
              }}
            >
              {visibleTimeSlots.map((timeSlot, index) => (
                <div
                  key={index}
                  style={{
                    // fontSize: 30,
                    padding: 30,
                    // paddingLeft: 20,
                    backgroundColor:
                      index === parseInt(t) % 5 ? "white" : "none",
                    color: index === parseInt(t) % 5 ? "black" : "white",
                    border:
                      index === parseInt(t) % 5 ? "none" : "1px solid gray",
                    borderRadius: 15,
                  }}
                >
                  {timeSlot}
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
      buttons: [
        <Button
          action="post"
          target={`/bookings?fid=${ctx.searchParams[
            "fid"
          ].toString()}&ownerName=${ownerName}&ownerimg=${ownerimg}&d=${d}`}
        >
          Go Back
        </Button>,
        <Button
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
          action="post"
          target={`/bookings?fid=${ctx.searchParams[
            "fid"
          ].toString()}&ownerName=${ownerName}&ownerimg=${ownerimg}&d=${d}&datefixed=true&t=${t}&timefixed=true`}
        >
          {`${timeslots[parseInt(t)]}`}
        </Button>,
        <Button
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
          action="post"
          target={`/bookings?fid=${ctx.searchParams[
            "fid"
          ].toString()}&ownerName=${ownerName}&ownerimg=${ownerimg}&d=${d}&datefixed=false`}
        >
          {`Change Date`}
        </Button>,
        <Button
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
