import React from "react";

const Hangman = ({ guessesTaken }) => (
  <svg
    viewBox="2.9868762493133545 1.9201202392578125 278.7746276855469 329.55145263671875"
    preserveAspectRatio="xMidYMid meet"
  >
    {guessesTaken > 0 && (
      <line
        id="gibbet-base"
        x1="27.2282"
        y1="284.62"
        x2="109.042"
        y2="284.62"
        className="gibbet"
      />
    )}
    {guessesTaken > 1 && (
      <line
        id="gibbet-upright"
        x1="70.6604"
        y1="286.135"
        x2="70.6604"
        y2="27.056"
        className="gibbet"
      />
    )}
    {guessesTaken > 2 && (
      <line
        id="gibbet-top"
        x1="64.6604"
        y1="25.5409"
        x2="213.583"
        y2="25.5409"
        className="gibbet"
      />
    )}
    {guessesTaken > 3 && (
      <line
        id="rope"
        x1="333"
        y1="167"
        x2="333"
        y2="237"
        className="line rope"
        transform="matrix(0.743526, 0, 0, 0.743526, -80.9631, -95.2282)"
      />
    )}
    {guessesTaken > 4 && (
      <circle
        id="head"
        cx="-95"
        cy="167"
        r="15"
        className="line head stickman"
        transform="rotate(-90)"
      />
    )}
    {guessesTaken > 5 && (
      <line
        id="torso"
        x1="334"
        y1="277"
        x2="334"
        y2="363"
        className="line torso stickman"
        transform="matrix(0.743526, 0, 0, 0.743526, -80.9631, -95.2282)"
      />
    )}
    {guessesTaken > 6 && (
      <line
        id="right-leg"
        x1="358.819"
        y1="400.936"
        x2="359.819"
        y2="486.936"
        className="line right-leg stickman"
        transform="matrix(0.574689, -0.188748, 0.188748, 0.574689, -114.767, 11.525)"
      />
    )}
    {guessesTaken > 7 && (
      <line
        id="left-leg"
        x1="326.288"
        y1="411.936"
        x2="325.288"
        y2="497.936"
        className="line left-leg stickman"
        transform="matrix(0.570598, 0.200776, -0.200776, 0.570598, 64.0571, -126.452)"
      />
    )}
    {guessesTaken > 8 && (
      <line
        id="right-arm"
        x1="385.963"
        y1="324.237"
        x2="385.963"
        y2="410.237"
        className="line right-arm stickman"
        transform="matrix(0.474113, -0.155715, 0.155715, 0.474113, -65.0204, 28.5131)"
      />
    )}
    {guessesTaken > 9 && (
      <line
        id="left-arm"
        x1="351.874"
        y1="360.461"
        x2="351.874"
        y2="446.461"
        className="line left-arm stickman"
        transform="matrix(0.470677, 0.144463, -0.142393, 0.47554, 51.6796, -99.6718)"
      />
    )}
  </svg>
);

export default Hangman;
