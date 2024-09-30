import Grid from "../components/Grid";
import Column from "../components/Column";

export default function Navigation() {
  const columnData1 = [
    {
      iconSrc: "/icons/facebook.webp",
      label: "Facebook",
      url: "https://www.facebook.com",
      triggerKey: "f",
    },
    {
      iconSrc: "/icons/instagram.webp",
      label: "Instagram",
      url: "https://www.instagram.com/",
    },
    {
      iconSrc: "/icons/pinterest.webp",
      label: "Pinterest",
      url: "https://jp.pinterest.com/",
    },
    {
      iconSrc: "/icons/xtb.webp",
      label: "XTB",
      url: "https://xstation5.xtb.com/?branch=cz#/real/loggedIn",
    },
    {
      iconSrc: "/icons/shein.webp",
      label: "Shein",
      url: "https://euqs.shein.com/?_t=1727281534755",
    },
    {
      iconSrc: "/icons/temu.webp",
      label: "Temu",
      url: "https://www.temu.com/cz",
    },
    {
      iconSrc: "/icons/aliexpress.webp",
      label: "AliExpress",
      url: "https://www.aliexpress.com/",
    },
    {
      iconSrc: "/icons/linkedin.webp",
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/svihel-jakub/",
    },
    {
      iconSrc: "/icons/youtube.webp",
      label: "Youtube",
      url: "https://www.youtube.com/",
    },
  ];

  const columnData2 = [
    {
      iconSrc: "/icons/bombuj.webp",
      label: "Bombuj",
      url: "https://www.bombuj.si",
    },
    {
      iconSrc: "/icons/4anime.webp",
      label: "4anime",
      url: "https://4anime.gg/user/bookmarks",
    },
    {
      iconSrc: "/icons/sledujuserialy.webp",
      label: "SledujuSerialy",
      url: "https://serialy.io/ucet/",
    },
  ];

  const columnData3 = [
    {
      iconSrc: "/icons/bombuj.webp",
      label: "Bombuj",
      url: "https://www.bo  mbuj.si",
    },
    {
      iconSrc: "/icons/4anime.webp",
      label: "4anime",
      url: "https://4anime.gg/user/bookmarks",
    },
    {
      iconSrc: "/icons/sledujuserialy.webp",
      label: "SledujuSerialy",
      url: "https://serialy.io/ucet/",
    },
  ];

  const columnData4 = [
    {
      iconSrc: "/icons/bombuj.webp",
      label: "Bombuj",
      url: "https://www.bombuj.si",
    },
    {
      iconSrc: "/icons/4anime.webp",
      label: "4anime",
      url: "https://4anime.gg/user/bookmarks",
    },
    {
      iconSrc: "/icons/sledujuserialy.webp",
      label: "SledujuSerialy",
      url: "https://serialy.io/ucet/",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Grid>
        <Column label="Sítě" buttons={columnData1} />
        <Column label="Média" buttons={columnData2} />
        <Column label="Média" buttons={columnData3} />
        <Column label="Média" buttons={columnData4} />
      </Grid>
    </div>
  );
}
