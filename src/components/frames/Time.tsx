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
