function preLoadImg(img, url) {
  return new Promise(function (resolve, reject) {
    img.src = url;
    img.onload = resolve;
    img.onerror = reject;
  });
}

function imgPreview(fileDom) {
  let reader;
  if (window.FileReader) {
    reader = new FileReader();
  } else {
    alert("Your device doesn't support uploading images.");
    return;
  }

  const file = fileDom.files[0];
  const imageType = /^image\//g;

  if (!imageType.test(file.type)) {
    alert("Please upload a picture!");
    return;
  }

  reader.onload = function (e) {
    let img = document.getElementById("preview");
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function put_text(canvas, content, Hero_class, Hero_name, CE) {
  let ATK = document.getElementById("ATK").value || 0;
  let HP = document.getElementById("HP").value || 0;
  let y = [727, 732, 753, 830];
  if (CE) {
    ATK = "+" + ATK;
    HP = "+" + HP;
  }
  content.textAlign = "center";
  content.font = "50px FGO";
  content.lineWidth = 4;
  content.strokeStyle = "black";
  content.strokeText(Hero_class, 250, y[0]);
  content.fillStyle = "white";
  content.fillText(Hero_class, 250, y[0]);

  content.font = "22px FGO";
  content.strokeStyle = "black";
  content.lineWidth = 3;
  content.strokeText(Hero_name, 250, y[2]);
  content.fillStyle = "white";
  content.fillText(Hero_name, 250, y[2]);

  content.font = "50px FGO";
  content.strokeStyle = "black";
  content.strokeText(ATK, 130, y[3]);
  let my_gradient = content.createLinearGradient(0, y[3] - 50, 0, y[3]);
  if (!CE && !document.getElementById("gold").checked) {
    my_gradient.addColorStop(0.5, "#ffeb04");
    my_gradient.addColorStop(0.6, "#b1a300");
    my_gradient.addColorStop(1, "#ffeb04");
  } else {
    my_gradient.addColorStop(0.5, "white");
    my_gradient.addColorStop(0.6, "#8f8f8f");
    my_gradient.addColorStop(1, "white");
  }
  content.fillStyle = my_gradient;
  content.fillText(ATK, 130, y[3]);

  content.strokeStyle = "black";
  content.strokeText(HP, 370, y[3]);
  content.fillStyle = my_gradient;
  content.fillText(HP, 370, y[3]);

  dataURL = canvas.toDataURL();
  document.getElementById("pic_show").src = dataURL;
}

//fixes font loading issue
function get_pic_twice(id) {
  time = Date.now();
  get_pic(id);
  setTimeout(() => {
    return get_pic(id);
  }, 550);
}

function get_pic(id) {
  const canvas = document.getElementById(id);
  const content = canvas.getContext("2d");
  content.clearRect(0, 0, canvas.width, canvas.height);
  let img_logo = new Image();
  let img_frame = new Image();
  let img_hero = new Image();
  img_logo.crossOrigin = "";
  img_hero.crossOrigin = "";
  let Hero_rarity = document.getElementById("Hero_rarity").value || 5;
  img_hero = document.getElementById("preview");
  if (!img_hero.src) {
    alert("Please upload a picture!");
    return;
  }
  if (document.getElementById("toggle").checked) {
    let Hero_class = document.getElementById("Hero_class").value || "all";
    const Hero_name = document.getElementById("Hero_name").value || "Unknown";
    if (Hero_rarity == 0) {
      img_logo.src = "img/fgo/" + Hero_class + "0.png";
    } else if (Hero_rarity == 1 || Hero_rarity == 2) {
      img_logo.src = "img/fgo/" + Hero_class + "1.png";
    } else if (Hero_rarity == 3) {
      img_logo.src = "img/fgo/" + Hero_class + "2.png";
    } else {
      img_logo.src = "img/fgo/" + Hero_class + "3.png";
    }
    img_frame.src = "img/fgo/S" + Hero_rarity + ".png";

    const icon_pos = {
      saber: [213, 753],
      archer: [211, 753],
      lancer: [213, 753],
      caster: [215, 753],
      assassin: [213, 751],
      rider: [215, 754],
      berserker: [213, 751],
      ruler: [213, 753],
      shielder: [213, 750],
      avenger: [213, 752],
      mooncancer: [213, 752],
      alterego: [213, 752],
      beast: [213, 752],
      all: [213, 752],
      none: [213, 752],
    };
    let promiseAll = [
      preLoadImg(img_hero, img_hero.src),
      preLoadImg(img_frame, img_frame.src),
      preLoadImg(img_logo, img_logo.src),
    ];

    Promise.all(promiseAll).then(() => {
      content.drawImage(img_hero, 0, 0, 500, 730);
      content.drawImage(img_frame, 0, 0, 500, 850);
      content.drawImage(img_logo, ...icon_pos[Hero_class], 76, 76);
      Hero_class = Hero_class.slice(0, 1).toUpperCase() + Hero_class.slice(1);
      Hero_class = document.getElementById("Hero_subname").value || Hero_class;
      put_text(canvas, content, Hero_class, Hero_name, false);
    });
  } else {
    if (Hero_rarity == 0) Hero_rarity = 1;
    const Hero_class = document.getElementById("CE_subname").value || "Unknown";
    const Hero_name = document.getElementById("CE_name").value || "Unknown";
    img_frame.src = "img/fgo/CE" + Hero_rarity + ".png";

    let promiseAll = [
      preLoadImg(img_hero, img_hero.src),
      preLoadImg(img_frame, img_frame.src),
    ];

    Promise.all(promiseAll).then(() => {
      content.drawImage(img_hero, 0, 0, 500, 850);
      content.drawImage(img_frame, 0, 0, 500, 850);
      put_text(canvas, content, Hero_name, Hero_class, true);
    });
  }

  resize();
}

function resize() {
  width = document.body.clientWidth;
  if (width <= 512) {
    document.getElementById("pic_show").style.width = "100%";
  } else {
    document.getElementById("pic_show").style.width = "512px";
  }
}

function init() {
  const input = document.getElementById("clear");
  input.value = "";
}

init();
