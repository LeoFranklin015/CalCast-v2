export const Time = ({
  ownerName,
  ownerimg,
  duration,
  visibleTimeSlots,
  t,
}: {
  ownerName: any;
  ownerimg: any;
  duration: any;
  visibleTimeSlots: any;
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
        background: "linear-gradient(to bottom ,#401d53  ,#1f1d22 )",

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
            // alignItems: "center",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: 48,
              fontFamily: "dm-sans",
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
              width={164}
              height={164}
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
          fontSize: 64,
          fontStyle: "extra-bold",
          marginTop: -120,
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

            alignItems: "center",
            // justifyContent: "flex-start",
            justifyContent: "space-between",

            marginTop: 10,
          }}
        >
          {visibleTimeSlots.map((timeSlot: any, index: any) => (
            <div
              key={index}
              style={{
                // fontSize: 30,
                padding: 30,
                // paddingLeft: 20,
                backgroundColor: index === parseInt(t) % 5 ? "white" : "none",
                color: index === parseInt(t) % 5 ? "black" : "white",
                border: index === parseInt(t) % 5 ? "none" : "1px solid gray",
                borderRadius: 15,
              }}
            >
              {timeSlot}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
