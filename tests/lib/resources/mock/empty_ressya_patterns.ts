export default {
  FileType: 'OuDia.1.02',
  Rosen: [
    {
      Rosenmei: 'eki_patterns',
      Eki: [
        {
          Ekimei: 'eki_normal__starting_terminal',
          Ekijikokukeisiki: 'Jikokukeisiki_NoboriChaku',
          Ekikibo: 'Ekikibo_Ippan',
        },
        {
          Ekimei: 'eki_normal__dep_only',
          Ekijikokukeisiki: 'Jikokukeisiki_Hatsu',
          Ekikibo: 'Ekikibo_Ippan',
        },
        {
          Ekimei: 'eki_core__dep_only',
          Ekijikokukeisiki: 'Jikokukeisiki_Hatsu',
          Ekikibo: 'Ekikibo_Syuyou',
        },
        {
          Ekimei: 'eki_normal__dep_and_arrv',
          Ekijikokukeisiki: 'Jikokukeisiki_Hatsuchaku',
          Ekikibo: 'Ekikibo_Ippan',
        },
        {
          Ekimei: 'eki_normal_last_terminal',
          Ekijikokukeisiki: 'Jikokukeisiki_KudariChaku',
          Ekikibo: 'Ekikibo_Ippan',
        },
      ],
      Ressyasyubetsu: [
        {
          Syubetsumei: 'local',
          JikokuhyouMojiColor: '00000000',
          JikokuhyouFontIndex: '0',
          DiagramSenColor: '00000000',
          DiagramSenStyle: 'SenStyle_Jissen',
          StopMarkDrawType: 'EStopMarkDrawType_Nothing',
        },
      ],
      Dia: [
        {
          DiaName: 'target_dia',
          Kudari: { Ressya: [] },
          Nobori: { Ressya: [] },
        },
      ],
      KitenJikoku: '400',
      DiagramDgrYZahyouKyoriDefault: '60',
      Comment: 'comment\\nafterbreakline',
    },
  ],
  DispProp: {
    JikokuhyouFont: [
      'PointTextHeight=9;Facename=ＭＳ ゴシック',
      'PointTextHeight=9;Facename=ＭＳ ゴシック;Bold=1',
      'PointTextHeight=9;Facename=ＭＳ ゴシック;Itaric=1',
      'PointTextHeight=9;Facename=ＭＳ ゴシック;Bold=1;Itaric=1',
      'PointTextHeight=9;Facename=ＭＳ ゴシック',
      'PointTextHeight=9;Facename=ＭＳ ゴシック',
      'PointTextHeight=9;Facename=ＭＳ ゴシック',
      'PointTextHeight=9;Facename=ＭＳ ゴシック',
    ],
    JikokuhyouVFont: 'PointTextHeight=9;Facename=@ＭＳ ゴシック',
    DiaEkimeiFont: 'PointTextHeight=9;Facename=ＭＳ ゴシック',
    DiaJikokuFont: 'PointTextHeight=9;Facename=ＭＳ ゴシック',
    DiaRessyaFont: 'PointTextHeight=9;Facename=ＭＳ ゴシック',
    CommentFont: 'PointTextHeight=9;Facename=ＭＳ ゴシック',
    DiaMojiColor: '00000000',
    DiaHaikeiColor: '00FFFFFF',
    DiaRessyaColor: '00000000',
    DiaJikuColor: '00C0C0C0',
    EkimeiLength: '6',
    JikokuhyouRessyaWidth: '6',
  },
  FileTypeAppComment: 'OuDia Ver. 1.02.02',
};
