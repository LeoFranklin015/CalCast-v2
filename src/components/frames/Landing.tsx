export const Landing = ({
  ownerName,
  ownerimg,
  duration,
}: {
  ownerName: any;
  ownerimg: any;
  duration: any;
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
        padding: 100,
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
              fontSize: 88,
              fontFamily: "Montserrat",
            }}
          >
            CalCast
          </div>
          <div
            style={{
              color: "white",
              display: "flex",
            }}
          >
            <img
              src={ownerimg}
              width={128}
              height={128}
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
          flexDirection: "column",
          gap: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 60,
            color: "white",
          }}
        >
          Meet @{ownerName}
        </div>
        <div
          style={{
            display: "flex",
            color: "white",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 48,
            }}
          >
            {duration} min
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#4CAF50",
              color: "white",
              paddingLeft: 20,
              paddingRight: 20,
              borderRadius: "15px",
              border: "2px solid white",
              fontSize: "48px", // Decrease font-size
              fontWeight: "bold",
              height: 60,
            }}
          >
            ~ Free
          </div>
        </div>
      </div>
    </div>
  );
};
