import React from "react";
import Particles from "react-particles-js";

export default () => (
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: `#000000`
    }}
  >
  <Particles
            params={{
                "particles": {
                    "line_linked": {
                                "color":"#FFFFFF"
                                },
                    "number": {
                        "value": 150
                    },
                    "size": {
                        "value": 5
                    }
                },
                "interactivity": {
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "repulse"
                        }
                    }
                }
            }}
            />
  </div>
);
