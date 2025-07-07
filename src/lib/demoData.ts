export const demoFolders = (userId) => {
  return [
    { name: "한국어", profile_id: userId },
    { name: "日本語", profile_id: userId },
    { name: "Deutsch", profile_id: userId },
  ];
};

export const demoItems = (userId, folderIds) => {
  return [
    {
      name: "die Tanne",
      meaning: "Fir tree",
      notes: "Weihnachtsbäume werden aus Tannenbäumen hergestellt.",
      folder_id: folderIds[2],
      profile_id: userId,
    },
    {
      name: "der Apfelbaum",
      meaning: "Apple tree",
      notes:
        "Die Apfelbäume in diesem Obstgarten waren dieses Jahr überraschend ertragreich.",
      folder_id: folderIds[2],
      profile_id: userId,
    },
    {
      name: "植える",
      meaning: "To plant",
      notes: "砂漠に一生懸命木を植え、明日の希望を探す。",
      folder_id: folderIds[1],
      profile_id: userId,
    },
    {
      name: "葉",
      meaning: "Leaf",
      notes: "秋には葉が赤く染まる。",
      folder_id: folderIds[1],
      profile_id: userId,
    },
    {
      name: "덤불",
      meaning: "Vines",
      notes:
        "덤불이 고성의 외벽을 둘러싸 있는게 마치 성의 주인들을 지켜내는 듯 했다.",
      folder_id: folderIds[0],
      profile_id: userId,
    },
    {
      name: "가지",
      meaning: "Branch",
      notes: "가지가 뻗어나가는 모양이 무척이나 아름다웠다.",
      folder_id: folderIds[0],
      profile_id: userId,
    },
    {
      name: "나무",
      meaning: "Tree",
      notes: "아침에 오솔길을 걸으며 나무로부터 기운을 받는다.",
      folder_id: folderIds[0],
      profile_id: userId,
    },
  ];
};
