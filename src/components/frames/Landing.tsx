const svgData = `
<svg width="15" height="15" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path class="fill-current" fill-rule="evenodd" d="M14.804.333a1.137 1.137 0 0 0-1.608 0L.333 13.196a1.137 1.137 0 0 0 0 1.608l12.863 12.863a1.137 1.137 0 0 0 1.608 0l12.863-12.863a1.137 1.137 0 0 0 0-1.608L14.804.333ZM14 5.159c0-.89-1.077-1.337-1.707-.707l-8.134 8.134a2 2 0 0 0 0 2.828l8.134 8.134c.63.63 1.707.184 1.707-.707V5.159Z" clip-rule="nonzero"></path>
</svg>
`;

const svgDataUrl = `data:image/svg+xml;base64,${btoa(svgData)}`;

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
        // backgroundColor: "white",
        background: "linear-gradient(to bottom ,#401d53  ,#1f1d22 )",

        padding: 60,
        fontSize: 24,
        // fontFamily: "dm-sans",
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
              fontSize: 128,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 700,
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
              width={220}
              height={220}
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
            fontSize: 48,
            color: "white",

            fontWeight: 700,
          }}
          // tw="font-dm-sans flex font-weight:700 text-white text-4xl"
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
              fontSize: 72,
              fontFamily: "dm-sans",
              fontWeight: 700,
            }}
          >
            {duration} mins
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              // justifyContent: "flex-end",
              alignItems: "center",
              color: "white",
              fontSize: "48px", // Decrease font-size
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 32,
                color: "grey",
                alignSelf: "flex-end",
                fontWeight: "semibold",
              }}
            >
              Price
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 48,
                fontWeight: "bold",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src="https://warpcast.com/~/images/Warp.png"
                alt="icon"
                width="60"
                height="60"
              />
              3500 warps
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
