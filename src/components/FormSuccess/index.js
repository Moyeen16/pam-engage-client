import { useEffect } from "react";
import "./index.css";
export default function FormSuccess() {
  var confettiPlayers = [];

  function makeItConfetti() {
    var confetti = document.querySelectorAll(".confetti");
    if (!confetti[0].animate) {
      return false;
    }

    for (var i = 0, len = confetti.length; i < len; ++i) {
      var candycorn = confetti[i];
      candycorn.innerHTML =
        '<div class="rotate"><div class="askew"></div></div>';
      var scale = Math.random() * 0.7 + 0.3;
      var player = candycorn.animate(
        [
          {
            transform: `translate3d(${
              (i / len) * 100
            }vw,-5vh,0) scale(${scale}) rotate(0turn)`,
            opacity: scale,
          },
          {
            transform: `translate3d(${
              (i / len) * 100 + 10
            }vw,105vh,0) scale(${scale}) rotate(${
              Math.random() > 0.5 ? "" : "-"
            }2turn)`,
            opacity: 1,
          },
        ],
        {
          duration: Math.random() * 3000 + 4000,
          iterations: Infinity,
          delay: -(Math.random() * 7000),
        }
      );

      confettiPlayers.push(player);
    }
  }
  function onChange(e) {
    document.body.setAttribute("data-type", "bookmarks");
    confettiPlayers.forEach(
      (player) =>
        (player.playbackRate = e.currentTarget.value === "bookmarks" ? 2 : 1)
    );
  }
  useEffect(() => {
    makeItConfetti();
    onChange({ currentTarget: { value: "bookmarks" } });
  }, []);

  return (
    <div>
      <div class="confetti-land">
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
        <div class="confetti"></div>
      </div>
    </div>
  );
}
