export const Confirm = ({
  ownerName,
  ownerimg,
  duration,
  dates,
  d,
  timeslots,
  t,
}: {
  ownerName: any;
  ownerimg: any;
  duration: any;
  dates: any;
  d: any;
  timeslots: any;
  t: any;
}) => {
  return (
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
          fontSize: 42,
        }}
      >
        {`Confirm your booking with ${ownerName} on ${
          dates[parseInt(d)]
        } July at ${timeslots[parseInt(t)]}?`}
      </div>
    </div>
  );
};
