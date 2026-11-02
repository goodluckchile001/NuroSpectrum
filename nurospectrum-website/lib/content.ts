// Content ported from the original index.html prototype.
// TEXT[key][languageIndex]: 0 = English, 1 = Hausa, 2 = Yorùbá, 3 = Igbo.
// Fall back to English (index 0) when a translation is missing.

export type Tone = 'green' | 'indigo' | 'gold' | 'rose'

export type Post = {
  id: string
  slug: string
  tag: string
  c: Tone
  title: string
  dek: string
  b: string[]
  n: string
  s: string
}

export type EventItem = { d: string; m: string; c: Tone }

export const TEXT: Record<string, string[]> = {
 "calm": [
  "Calm view",
  "Yanayin natsuwa",
  "Ìrísí ìdákẹ́jẹ́ẹ́",
  "Ọnọdụ udo"
 ],
 "h1": [
  "A Nigeria that works with and for neurodivergent minds.",
  "Najeriya da ke aiki tare da kuma domin tunanin masu bambancin kwakwalwa.",
  "Orílẹ̀-èdè Nàìjíríà tó ń ṣiṣẹ́ pẹ̀lú àti fún àwọn ọkàn tí ó yàtọ̀.",
  "Naịjirịa na-arụkọ ọrụ n’ime ma maka ọgụgụ isi dị iche."
 ],
 "lede": [
  "Nurospectrum is an education and community platform raising awareness of neurodiversity across Nigeria. Every mind is welcome here.",
  "Nurospectrum dandali ne na ilimi da al’umma da ke wayar da kai game da bambancin kwakwalwa (neurodiversity) a faɗin Najeriya. Kowane tunani yana da gurbi a nan.",
  "Nurospectrum jẹ́ pèpéle ẹ̀kọ́ àti àwùjọ tó ń ṣe ìfọ̀rọ̀jíṣẹ́ nípa oríṣiríṣi ọpọlọ (neurodiversity) káàkiri Nàìjíríà. Gbogbo èrò ni a gbà káàbọ̀ níbí.",
  "Nurospectrum bụ ikpo okwu agụmakwụkwọ na obodo na-eme ka mmadụ mara banyere ọdịiche n’ụbụrụ (neurodiversity) n’ofe Naịjirịa niile. Echiche ọ bụla nwere ohere ebe a."
 ],
 "joinb": [
  "Join your state community",
  "Shiga al’ummar jiharka",
  "Darapọ̀ mọ́ àwùjọ ìpínlẹ̀ rẹ",
  "Sonye n’obodo steeti gị"
 ],
 "learnb": [
  "Start learning",
  "Fara koyo",
  "Bẹ̀rẹ̀ sí kọ́ ẹ̀kọ́",
  "Malite ịmụ ihe"
 ],
 "a1t": [
  "I am neurodivergent",
  "Ni mai bambancin kwakwalwa ne",
  "Mo jẹ́ ẹni tí ọpọlọ rẹ̀ yàtọ̀",
  "Abụ m onye ụbụrụ ya dị iche"
 ],
 "a1d": [
  "Find people who understand, and a community in your state.",
  "Nemo mutanen da suka fahimce ka, da al’umma a jiharka.",
  "Wá àwọn ènìyàn tó yé ọ, àti àwùjọ ní ìpínlẹ̀ rẹ.",
  "Chọta ndị ghọtara gị, na obodo n’steeti gị."
 ],
 "a1l": [
  "Find my community",
  "Nemo al’ummata",
  "Wá àwùjọ mi",
  "Chọta obodo m"
 ],
 "a2t": [
  "I want to learn and support",
  "Ina so in koya in kuma tallafa",
  "Mo fẹ́ kọ́ ẹ̀kọ́ kí n sì ṣe àtìlẹ́yìn",
  "Achọrọ m ịmụ ma kwado"
 ],
 "a2d": [
  "Clear articles for families, teachers, employers and friends.",
  "Bayanai bayyanannu ga iyalai, malamai, ma’aikata da abokai.",
  "Ìwé tó ṣe kedere fún ẹbí, olùkọ́, agbanisíṣẹ́ àti ọ̀rẹ́.",
  "Ozi doro anya maka ezinụlọ, ndị nkụzi, ndị goro ọrụ na ndị enyi."
 ],
 "a2l": [
  "Read the blog",
  "Karanta bulogi",
  "Ka bulọọgi",
  "Gụọ blọọgụ"
 ],
 "a3t": [
  "I want to partner or give",
  "Ina so in zama abokin hulɗa ko in ba da gudummawa",
  "Mo fẹ́ jẹ́ alábàáṣiṣẹ́pọ̀ tàbí láti fúnni",
  "Achọrọ m ịbụ onye mmekọ ma ọ bụ inye onyinye"
 ],
 "a3d": [
  "Fund, collaborate with or contribute to this work.",
  "Tallafa, ko ku yi aiki tare da mu, ko ku ba da gudummawar ƙwarewa.",
  "Ṣe àtìlẹ́yìn, bá wa ṣiṣẹ́, tàbí pín ọgbọ́n rẹ.",
  "Kwado, soro anyị rụọ ọrụ, ma ọ bụ keta ọgụgụ isi gị."
 ],
 "a3l": [
  "Work with us",
  "Yi aiki da mu",
  "Bá wa ṣiṣẹ́",
  "Soro anyị rụọ ọrụ"
 ],
 "about": [
  "About us",
  "Game da mu",
  "Nípa wa",
  "Maka anyị"
 ],
 "ab1": [
  "Many neurodivergent Nigerians grow up without the words for how they think, or anyone to share it with. Families and teachers often want to help but have little reliable information.",
  "Yawancin ’yan Najeriya masu bambancin kwakwalwa suna girma ba tare da kalmomin bayyana yadda suke tunani ba, ko wanda za su yi magana da shi. Iyalai da malamai sau da yawa suna son taimakawa amma ba su da ingantattun bayanai.",
  "Ọ̀pọ̀ ọmọ Nàìjíríà tí ọpọlọ wọn yàtọ̀ ló ń dàgbà láìní ọ̀rọ̀ láti ṣàlàyé bí wọ́n ṣe ń ronú, tàbí ẹni tí wọ́n lè bá sọ̀rọ̀. Àwọn ẹbí àti olùkọ́ sábà máa ń fẹ́ ràn wọ́n lọ́wọ́ ṣùgbọ́n wọn kò ní ìmọ̀ tó dájú.",
  "Ọtụtụ ndị Naịjirịa ụbụrụ ha dị iche na-eto na-enweghị okwu ịkọwa otu ha si eche echiche, ma ọ bụ onye ha ga-agwa. Ezinụlọ na ndị nkụzi na-achọkarị inyere aka mana ha enweghị ozi ziri ezi."
 ],
 "ab2": [
  "Nurospectrum answers both. We publish well-sourced, plain-language articles, build state-by-state communities where “specs” can find each other, and host events that bring families, schools and employers into the conversation.",
  "Nurospectrum na magance duka biyun. Muna wallafa labarai masu sauƙi da tushe, muna gina al’umma a kowace jiha inda “specs” za su sami juna, kuma muna shirya taruka da ke haɗa iyalai, makarantu da ma’aikata.",
  "Nurospectrum ń yanjú méjèèjì. À ń tẹ̀ àwọn àpilẹ̀kọ tó rọrùn, tó ní orísun jáde, à ń kọ́ àwùjọ ní ìpínlẹ̀ kọ̀ọ̀kan níbi tí “specs” ti lè rí ara wọn, a sì ń ṣètò àwọn ìpàdé tó so ẹbí, ilé-ìwé àti ibi iṣẹ́ pọ̀.",
  "Nurospectrum na-azaghachi ha abụọ. Anyị na-ebipụta edemede dị mfe nwere isi iyi, na-ewu obodo n’steeti ọ bụla ebe “specs” nwere ike ịchọta ibe ha, ma na-ahazi emume na-ejikọta ezinụlọ, ụlọ akwụkwọ na ebe ọrụ."
 ],
 "ml": [
  "Our mission",
  "Manufarmu",
  "Iṣẹ́ wa",
  "Ọrụ anyị"
 ],
 "mt": [
  "To facilitate a Nigeria that works with and for neurodivergent minds.",
  "Mu taimaka wajen samar da Najeriya da ke aiki tare da kuma domin tunanin masu bambancin kwakwalwa.",
  "Láti jẹ́ kí Nàìjíríà ṣiṣẹ́ pẹ̀lú àti fún àwọn ọkàn tí ó yàtọ̀.",
  "Ime ka Naịjirịa na-arụkọ ọrụ n’ime ma maka ọgụgụ isi dị iche."
 ],
 "vl": [
  "Our vision",
  "Hangenmu",
  "Ìran wa",
  "Ọhụụ anyị"
 ],
 "vt": [
  "An inclusive Nigeria for the neurodiverse population.",
  "Najeriya mai haɗa kowa ga masu bambancin kwakwalwa.",
  "Nàìjíríà tó gba gbogbo ènìyàn, pẹ̀lú àwọn tí ọpọlọ wọn yàtọ̀.",
  "Naịjirịa na-anabata mmadụ niile, gụnyere ndị ụbụrụ ha dị iche."
 ],
 "evh": [
  "Upcoming events",
  "Abubuwan da ke tafe",
  "Àwọn ìṣẹ̀lẹ̀ tó ń bọ̀",
  "Emume na-abịa"
 ],
 "e0t": [
  "Understanding ADHD: an open evening for families",
  "Fahimtar ADHD: maraice a buɗe ga iyalai",
  "Òye ADHD: ìrọ̀lẹ́ ṣíṣí sílẹ̀ fún àwọn ẹbí",
  "Ịghọta ADHD: mgbede mepere emepe maka ezinụlọ"
 ],
 "e0d": [
  "A plain-language talk and Q&A for parents, siblings and friends. Online and free.",
  "Jawabi mai sauƙi da tambaya da amsa ga iyaye, ’yan’uwa da abokai. A yanar gizo, kyauta.",
  "Ọ̀rọ̀ tó rọrùn àti ìbéèrè àti èsì fún òbí, ọmọ ìyá àti ọ̀rẹ́. Lórí ayélujára, ọ̀fẹ́.",
  "Okwu dị mfe na ajụjụ na azịza maka nne na nna, ụmụnne na ndị enyi. Na ịntanetị, n’efu."
 ],
 "e1t": [
  "Sensory-friendly meet-up for neurodivergent adults",
  "Taron haɗuwa mai natsuwa ga manya masu bambancin kwakwalwa",
  "Ìpàdé ìdákẹ́jẹ́ẹ́ fún àwọn àgbàlagbà tí ọpọlọ wọn yàtọ̀",
  "Nzukọ udo maka ndị okenye ụbụrụ ha dị iche"
 ],
 "e1d": [
  "A quieter, low-pressure space to meet others. Lagos, with an online room.",
  "Wuri mai natsuwa, babu matsi, don saduwa da wasu. Legas, da kuma ɗakin yanar gizo.",
  "Ibi ìdákẹ́jẹ́ẹ́, láìsí ìdààmú, láti pàdé àwọn ẹlòmíràn. Èkó, àti yàrá orí ayélujára.",
  "Ebe dị jụụ, enweghị nrụgide, iji zute ndị ọzọ. Lagos, na ọnụ ụlọ ịntanetị."
 ],
 "e2t": [
  "Inclusive classrooms workshop for teachers",
  "Bita kan azuzuwa masu haɗa kowa ga malamai",
  "Ìdánilẹ́kọ̀ọ́ kíláàsì tó gba gbogbo ènìyàn fún àwọn olùkọ́",
  "Ogbako maka ụlọ klaasị na-anabata mmadụ niile maka ndị nkụzi"
 ],
 "e2d": [
  "Practical adjustments teachers can make this term without special equipment.",
  "Gyare-gyare masu sauƙi da malamai za su iya yi a wannan zangon karatu ba tare da kayan musamman ba.",
  "Àwọn àtúnṣe tó rọrùn tí olùkọ́ lè ṣe ní ìgbà ẹ̀kọ́ yìí láìsí ohun èlò pàtàkì.",
  "Mgbanwe dị mfe ndị nkụzi nwere ike ime n’oge a na-enweghị ngwá pụrụ iche."
 ],
 "bh": [
  "The blog",
  "Bulogi",
  "Bulọọgi",
  "Blọọgụ"
 ],
 "bl": [
  "Plain-language articles on neurodiversity. Each one names the sources behind it.",
  "Labarai masu sauƙi game da bambancin kwakwalwa. Kowanne yana bayyana tushensa.",
  "Àwọn àpilẹ̀kọ tó rọrùn nípa oríṣiríṣi ọpọlọ. Ọ̀kọ̀ọ̀kan ń dárúkọ orísun rẹ̀.",
  "Edemede dị mfe banyere ọdịiche n’ụbụrụ. Nke ọ bụla na-ekwu isi iyi ya."
 ],
 "p0g": [
  "Basics",
  "Tushe",
  "Ìpìlẹ̀",
  "Ntọala"
 ],
 "p1g": [
  "Education",
  "Ilimi",
  "Ẹ̀kọ́",
  "Agụmakwụkwọ"
 ],
 "p2g": [
  "Work",
  "Aiki",
  "Iṣẹ́",
  "Ọrụ"
 ],
 "p3g": [
  "Support",
  "Tallafi",
  "Àtìlẹ́yìn",
  "Nkwado"
 ],
 "p0t": [
  "Neurodiverse or neurodivergent? The words matter",
  "Neurodiverse ko neurodivergent? Kalmomin na da muhimmanci",
  "Neurodiverse tàbí neurodivergent? Àwọn ọ̀rọ̀ náà ṣe pàtàkì",
  "Neurodiverse ka neurodivergent? Okwu ndị a dị mkpa"
 ],
 "p0d": [
  "Two similar words with different meanings, and why we use both.",
  "Kalmomi biyu masu kama da juna amma ma’anoninsu daban, da dalilin da ya sa muke amfani da su duka.",
  "Ọ̀rọ̀ méjì tó jọra ṣùgbọ́n ìtumọ̀ wọn yàtọ̀, àti ìdí tí a fi ń lò méjèèjì.",
  "Okwu abụọ yiri ibe ha mana nwere nkọwa dị iche, na ihe mere anyị ji eji ha abụọ."
 ],
 "p1t": [
  "Five signs a classroom isn’t working for a neurodivergent student",
  "Alamu biyar da ke nuna ajin karatu bai dace da ɗalibi mai bambancin kwakwalwa ba",
  "Àmì márùn-ún tí kíláàsì kò bá akẹ́kọ̀ọ́ tí ọpọlọ rẹ̀ yàtọ̀ mu",
  "Ihe ịrịba ama ise na-egosi na klaasị adịghị arụ ọrụ maka nwa akwụkwọ ụbụrụ ya dị iche"
 ],
 "p1d": [
  "Often it is not about effort. It is about the environment.",
  "Sau da yawa ba game da ƙoƙari ba ne. Yanayi ne.",
  "Ó pọ̀ ìgbà, kì í ṣe nípa ìsapá. Àyíká ni.",
  "Ọtụtụ oge, ọ bụghị banyere mgbalị. Gburugburu ya bụ."
 ],
 "p2t": [
  "How to support a neurodivergent colleague",
  "Yadda za a tallafa wa abokin aiki mai bambancin kwakwalwa",
  "Bí a ṣe lè ṣe àtìlẹ́yìn fún alábàáṣiṣẹ́ tí ọpọlọ rẹ̀ yàtọ̀",
  "Otu esi akwado onye ọrụ ibe ụbụrụ ya dị iche"
 ],
 "p2d": [
  "Small, specific adjustments, agreed with the person, go a long way.",
  "Ƙananan gyare-gyare na musamman, da aka amince da mutumin, na taimakawa sosai.",
  "Àwọn àtúnṣe kékeré tó ṣe pàtó, tí a gbà pẹ̀lú ẹni náà, ń ṣe ànfàní púpọ̀.",
  "Mgbanwe nta doro anya, nke e kwekọrịtara na onye ahụ, na-enye aka nke ukwuu."
 ],
 "p3t": [
  "If you think your child may be neurodivergent, where to start",
  "Idan kana tsammanin yaronka yana da bambancin kwakwalwa, ga inda za ka fara",
  "Tí o bá rò pé ọmọ rẹ lè ní ọpọlọ tó yàtọ̀, níbi tí o ti lè bẹ̀rẹ̀",
  "Ọ bụrụ na ị chere na nwa gị nwere ụbụrụ dị iche, ebe ị ga-esi malite"
 ],
 "p3d": [
  "A calm first-steps guide for parents and carers.",
  "Jagorar matakan farko cikin natsuwa ga iyaye da masu kulawa.",
  "Ìtọ́sọ́nà ìgbésẹ̀ àkọ́kọ́ ní ìdákẹ́jẹ́ẹ́ fún òbí àti olùtọ́jú.",
  "Ntụziaka usoro mbụ n’udo maka nne na nna na ndị na-elekọta."
 ],
 "back": [
  "Back to the blog",
  "Koma bulogi",
  "Padà sí bulọọgi",
  "Laghachi na blọọgụ"
 ],
 "src": [
  "Source",
  "Tushe",
  "Orísun",
  "Isi iyi"
 ],
 "note": [
  "",
  "Wannan labarin yana cikin Turanci a yanzu.",
  "Àpilẹ̀kọ yìí wà ní èdè Gẹ̀ẹ́sì fún ìgbà díẹ̀.",
  "Edemede a dị n’asụsụ Bekee ugbu a."
 ],
 "ch": [
  "Find your people, in your state.",
  "Nemo mutanenka a jiharka.",
  "Wá àwọn ènìyàn rẹ ní ìpínlẹ̀ rẹ.",
  "Chọta ndị gị n’steeti gị."
 ],
 "cl": [
  "“Specs” are the neurodivergent people and allies who make up Nurospectrum. Choose your state to join its community.",
  "“Specs” su ne masu bambancin kwakwalwa da abokan tafiyarsu a Nurospectrum. Zaɓi jiharka don shiga al’ummarta.",
  "“Specs” ni àwọn tí ọpọlọ wọn yàtọ̀ àti àwọn alátìlẹ́yìn wọn ní Nurospectrum. Yan ìpínlẹ̀ rẹ láti darapọ̀ mọ́ àwùjọ rẹ̀.",
  "“Specs” bụ ndị ụbụrụ ha dị iche na ndị na-akwado ha na Nurospectrum. Họrọ steeti gị ka ị sonye n’obodo ya."
 ],
 "cs": [
  "Select a state above to begin.",
  "Zaɓi jiha a sama don farawa.",
  "Yan ìpínlẹ̀ lókè láti bẹ̀rẹ̀.",
  "Họrọ steeti n’elu ka ị malite."
 ],
 "cx": [
  "community",
  "al’umma",
  "àwùjọ",
  "obodo"
 ],
 "cp": [
  "Meet others, share what works and hear about local events. Tell us how you would like to take part.",
  "Ku haɗu da wasu, ku raba abin da ke aiki, ku ji labarin taruka a yankinku. Faɗa mana yadda kake son shiga.",
  "Pàdé àwọn ẹlòmíràn, pín ohun tó ń ṣiṣẹ́, kí o sì gbọ́ nípa àwọn ìpàdé àdúgbò. Sọ fún wa bí o ṣe fẹ́ kópa.",
  "Zute ndị ọzọ, kerịta ihe na-arụ ọrụ, ma nụ banyere emume dị nso. Gwa anyị otu ị chọrọ isi sonye."
 ],
 "fn": [
  "Your name",
  "Sunanka",
  "Orúkọ rẹ",
  "Aha gị"
 ],
 "fc": [
  "Email or WhatsApp number",
  "Imel ko lambar WhatsApp",
  "Ímeèlì tàbí nọ́mbà WhatsApp",
  "Email ma ọ bụ nọmba WhatsApp"
 ],
 "fr": [
  "I am joining as",
  "Ina shiga a matsayin",
  "Mo ń darapọ̀ gẹ́gẹ́ bí",
  "Ana m esonye dị ka"
 ],
 "jb": [
  "Join the community",
  "Shiga al’umma",
  "Darapọ̀ mọ́ àwùjọ",
  "Sonye n’obodo"
 ],
 "wl": [
  "Welcome, {n}. We will contact you about the {s} community soon.",
  "Barka da zuwa, {n}. Za mu tuntube ka game da al’ummar {s} nan ba da daɗewa ba.",
  "Káàbọ̀, {n}. A ó kàn sí ọ láìpẹ́ nípa àwùjọ {s}.",
  "Nnọọ, {n}. Anyị ga-akpọtụrụ gị n’oge na-adịghị anya banyere obodo {s}."
 ],
 "ph": [
  "Build this with us.",
  "Mu gina wannan tare.",
  "Ẹ jẹ́ ká kọ́ èyí papọ̀.",
  "Ka anyị jikọta wuo nke a."
 ],
 "pl": [
  "Nurospectrum is growing a national movement. We welcome organisations and individuals who share our vision of an inclusive Nigeria.",
  "Nurospectrum na gina motsi na ƙasa baki ɗaya. Muna maraba da ƙungiyoyi da mutane masu irin hangenmu na Najeriya mai haɗa kowa.",
  "Nurospectrum ń kọ́ ìgbésẹ̀ orílẹ̀-èdè. A gba àwọn ẹgbẹ́ àti ẹnìkọ̀ọ̀kan tó ní ìran kan náà pẹ̀lú wa káàbọ̀.",
  "Nurospectrum na-ewu mmegharị n’ofe obodo. Anyị na-anabata òtù na ndị mmadụ nwere otu ọhụụ anyị nke Naịjirịa na-anabata mmadụ niile."
 ],
 "q1t": [
  "Partners",
  "Abokan hulɗa",
  "Àwọn alábàáṣiṣẹ́pọ̀",
  "Ndị mmekọ"
 ],
 "q1d": [
  "Schools, hospitals, NGOs, employers and media who want to run programmes or events with us.",
  "Makarantu, asibitoci, ƙungiyoyi, ma’aikata da kafafen yaɗa labarai da ke son gudanar da shirye-shirye tare da mu.",
  "Ilé-ìwé, ilé-ìwòsàn, àjọ aláìṣe-fún-èrè, agbanisíṣẹ́ àti ilé-iṣẹ́ ìròyìn tó fẹ́ ṣe àwọn ètò pẹ̀lú wa.",
  "Ụlọ akwụkwọ, ụlọ ọgwụ, òtù, ndị goro ọrụ na mgbasa ozi chọrọ ịrụkọ ọrụ n’atụmatụ na anyị."
 ],
 "q2t": [
  "Investors and funders",
  "Masu zuba jari da masu tallafi",
  "Àwọn olùdókòwò àti olùtọ́jú owó",
  "Ndị na-etinye ego na ndị na-akwado"
 ],
 "q2d": [
  "Support the platform, state communities and awareness work that reach neurodivergent Nigerians.",
  "Tallafa wa dandalin, al’ummomin jihohi da aikin wayar da kai.",
  "Ṣe àtìlẹ́yìn pèpéle náà, àwọn àwùjọ ìpínlẹ̀ àti iṣẹ́ ìfọ̀rọ̀jíṣẹ́.",
  "Kwado ikpo okwu a, obodo steeti na ọrụ ịmara ọha."
 ],
 "q3t": [
  "Contributors",
  "Masu ba da gudummawa",
  "Àwọn olùkópa",
  "Ndị na-enye aka"
 ],
 "q3d": [
  "Writers, clinicians, educators, designers and developers who can share their skills and knowledge.",
  "Marubuta, likitoci, malamai, masu zane da masu shirya manhaja masu son raba ƙwarewa.",
  "Òǹkọ̀wé, dókítà, olùkọ́, apẹ̀rẹ̀ àti olùgbéséwé tó lè pín ọgbọ́n wọn.",
  "Ndị edemede, dọkịta, ndị nkụzi, ndị ode na ndị mmepụta sọftụwia nwere ike keta ọgụgụ isi ha."
 ],
 "sh": [
  "Start a conversation",
  "Fara tattaunawa",
  "Bẹ̀rẹ̀ ìjíròrò",
  "Malite mkparịta ụka"
 ],
 "fo": [
  "Organisation (optional)",
  "Ƙungiya (zaɓi)",
  "Ẹgbẹ́ (àìgbọdọ̀máṣe)",
  "Òtù (nhọrọ)"
 ],
 "fe": [
  "Email",
  "Imel",
  "Ímeèlì",
  "Email"
 ],
 "fi": [
  "I would like to",
  "Ina so in",
  "Mo fẹ́",
  "Achọrọ m"
 ],
 "fm": [
  "Message",
  "Saƙo",
  "Ìfiránṣẹ́",
  "Ozi"
 ],
 "sb": [
  "Send message",
  "Aika saƙo",
  "Fi ìfiránṣẹ́ ránṣẹ́",
  "Zipu ozi"
 ],
 "th": [
  "Thank you, {n}. We will reply to {e} soon.",
  "Na gode, {n}. Za mu amsa zuwa {e} nan ba da daɗewa ba.",
  "O ṣeun, {n}. A ó dá {e} lóhùn láìpẹ́.",
  "Daalụ, {n}. Anyị ga-azaghachi {e} n’oge na-adịghị anya."
 ],
 "ft": [
  "Nurospectrum (Nurospec) · Lagos, Nigeria · Awareness, education and community for neurodivergent minds.",
  "Nurospectrum (Nurospec) · Legas, Najeriya · Wayar da kai, ilimi da al’umma domin masu bambancin kwakwalwa.",
  "Nurospectrum (Nurospec) · Èkó, Nàìjíríà · Ìfọ̀rọ̀jíṣẹ́, ẹ̀kọ́ àti àwùjọ fún àwọn ọkàn tí ó yàtọ̀.",
  "Nurospectrum (Nurospec) · Lagos, Naịjirịa · Mmara ọha, agụmakwụkwọ na obodo maka ọgụgụ isi dị iche."
 ],
 "sth": [
  "Share your story",
  "Raba labarinka",
  "Pín ìtàn rẹ",
  "Kesaa akụkọ gị"
 ],
 "libh": [
  "Library",
  "Ɗakin karatu",
  "Ilé ìkàwé",
  "Ọba akwụkwọ"
 ],
 "wa": ["Join on WhatsApp","Shiga ta WhatsApp","Darapọ̀ lórí WhatsApp","Sonye na WhatsApp"],
 "waAll": ["Join our national WhatsApp community","Shiga al’ummarmu ta WhatsApp ta ƙasa","Darapọ̀ mọ́ àwùjọ WhatsApp wa jákèjádò orílẹ̀-èdè","Sonye n’obodo WhatsApp anyị n’ofe obodo"],
 "waNote": ["WhatsApp opens in a new tab. Other members may be able to see your phone number, so only join if you are comfortable with that.","WhatsApp zai buɗe a sabon shafi. Sauran membobi na iya ganin lambar wayarka, don haka ka shiga idan ka amince da hakan.","WhatsApp yóò ṣí ní táàbù tuntun. Àwọn ọmọ ẹgbẹ́ yòókù lè rí nọ́mbà fóònù rẹ, nítorí náà darapọ̀ nígbà tí o bá fara mọ́ ọn.","WhatsApp ga-emeghe n’taabụ ọhụrụ. Ndị otu ndị ọzọ nwere ike ịhụ nọmba ekwentị gị, ya mere sonye ma ọ bụrụ na ị kwenyere."],
 "joinForm": ["Or tell us about yourself","Ko ka gaya mana game da kanka","Tàbí sọ nípa ara rẹ fún wa","Ma ọ bụ gwa anyị banyere onwe gị"],
 "loc": ["Use my location","Yi amfani da wurina","Lo ibi tí mo wà","Jiri ebe m nọ"],
 "locBusy": ["Finding your state…","Ana neman jiharka…","À ń wá ìpínlẹ̀ rẹ…","Na-achọ steeti gị…"],
 "locOk": ["We think you are in {s}. Not right? Choose another state below.","Muna tsammanin kana {s}. Ba daidai ba ne? Zaɓi wata jiha a ƙasa.","A rò pé o wà ní {s}. Kò tọ̀nà? Yan ìpínlẹ̀ mìíràn ní ìsàlẹ̀.","Anyị chere na ị nọ na {s}. Ọ bụghị ya? Họrọ steeti ọzọ n’okpuru."],
 "locDenied": ["We could not get your location. Please choose your state below.","Ba mu iya samun wurinka ba. Don Allah zaɓi jiharka a ƙasa.","A kò lè rí ibi tí o wà. Jọ̀wọ́ yan ìpínlẹ̀ rẹ ní ìsàlẹ̀.","Anyị enweghị ike ịhụ ebe ị nọ. Biko họrọ steeti gị n’okpuru."],
 "locOut": ["You seem to be outside Nigeria. Please choose a state below.","Kamar kana wajen Najeriya. Don Allah zaɓi jiha a ƙasa.","Ó dàbí pé o wà ní òde Nàìjíríà. Jọ̀wọ́ yan ìpínlẹ̀ kan ní ìsàlẹ̀.","Ọ dị ka ị nọ na mpụga Naịjirịa. Biko họrọ steeti n’okpuru."],
 "locNote": ["Your location stays on your device. We only use it to suggest a state.","Wurinka yana zama a na’urarka. Muna amfani da shi ne kawai don ba da shawarar jiha.","Ibi tí o wà kò kúrò lórí ẹ̀rọ rẹ. A kàn ń lò ó láti dábàá ìpínlẹ̀.","Ebe ị nọ anaghị ahapụ ngwaọrụ gị. Anyị na-eji ya naanị tụpụta steeti."],
 "signin": ["Sign in","Shiga","Wọlé","Banye"],
 "signout": ["Sign out","Fita","Jáde","Pụọ"],
 "liP": ["Use your Google account to sign in. We receive your name, email address and profile picture from Google, and never your password.","Yi amfani da asusun Google ɗinka don shiga. Muna karɓar sunanka, adireshin imel da hotonka daga Google, ba za mu taɓa samun kalmar sirrinka ba.","Lo àkọọ́lẹ̀ Google rẹ láti wọlé. À ń gba orúkọ rẹ, àdírẹ́sì ímeèlì àti fọ́tò rẹ láti ọ̀dọ̀ Google, a kì í sì í gba ọ̀rọ̀ aṣínà rẹ.","Jiri akaụntụ Google gị banye. Anyị na-enweta aha gị, adreesị email na foto gị site na Google, anyị anaghị enweta paswọọdụ gị."],
 "liBtn": ["Continue with Google","Ci gaba da Google","Tẹ̀ síwájú pẹ̀lú Google","Gaa n’ihu na Google"],
 "liBusy": ["Opening Google…","Ana buɗe Google…","À ń ṣí Google…","Na-emeghe Google…"],
 "liErr": ["Sign-in did not work. Please try again.","Shiga bai yi nasara ba. Don Allah a sake gwadawa.","Wíwọlé kò ṣiṣẹ́. Jọ̀wọ́ gbìyànjú lẹ́ẹ̀kan sí i.","Mbanye adịghị arụ ọrụ. Biko nwaa ọzọ."],
 "loP": ["You are signed in as {n}. Do you want to sign out?","Ka shiga a matsayin {n}. Kana so ka fita?","O ti wọlé gẹ́gẹ́ bí {n}. Ṣé o fẹ́ jáde?","Ị banyere dị ka {n}. Ị chọrọ ịpụ?"],
 "loStay": ["Stay signed in","Ci gaba da kasancewa a shiga","Dúró nínú àkọọ́lẹ̀","Nọgide na akaụntụ"],
 "loNone": ["You are not signed in.","Ba ka shiga ba.","O kò tíì wọlé.","Ị banyeghị."],
 "skip": ["Skip to content","Tsallaka zuwa abun ciki","Foríbalẹ̀ sí àkóónú","Wụga gaa ọdịnaya"],
 "menu": ["Menu","Menu","Àtòkọ","Menu"],
 "sf": ["Search for your state","Nemo jiharka","Wá ìpínlẹ̀ rẹ","Chọọ steeti gị"],
 "sn": ["No state matches your search.","Babu jihar da ta dace da binciken ka.","Kò sí ìpínlẹ̀ tó bá ìwádìí rẹ mu.","Enweghị steeti kwekọrọ na ọchụchọ gị."],
 "communityLoading": ["Loading communities…","Ana loda al’ummomi…","À ń ṣí àwọn àwùjọ…","Na-ebunye obodo…"],
 "communityEmpty": ["No communities are available yet.","Babu al’umma da ake da su tukuna.","A kò tíì ní àwùjọ kankan.","Enweghị obodo dị ugbu a."],
 "communityRole": ["I am a…","Ni…","Èmi jẹ́…","Abụ m…"],
 "roleChoose": ["Choose a role (optional)","Zaɓi matsayi (zaɓi ne)","Yan ipa kan (àṣàyàn ni)","Họrọ ọrụ (nhọrọ)"],
 "joining": ["Joining…","Ana shiga…","Ó ń darapọ̀…","Na-esonye…"],
 "signInJoin": ["Sign in is required to join and receive the WhatsApp invite.","Ana buƙatar shiga don shiga al’umma da karɓar gayyatar WhatsApp.","O gbọdọ wọlé láti darapọ̀ àti gba ìpè WhatsApp.","Ị ga-abanye iji sonye ma nata akwụkwọ ịkpọ òkù WhatsApp."],
 "storyLead": ["A no-judgement space to share your journey with a developmental disability, whether you live with one or you are a parent or carer. Your story can encourage someone else and help others understand.","Wuri ne marar hukunci don raba tafiyarka game da nakasar ci gaba, ko kana da ita ko kai iyaye ne ko mai kulawa. Labarinka na iya ƙarfafa wani da taimaka wa mutane su fahimta.","Ààyè tí kò ní ìdájọ́ láti pín ìrírí rẹ nípa àìlera ìdàgbàsókè, yálà o ń gbé pẹ̀lú rẹ tàbí o jẹ́ òbí tàbí olùtọ́jú. Ìtàn rẹ lè fún ẹlòmíràn níṣìírí kí ó sì ran àwọn míì lọ́wọ́ láti lóye.","Ebe enweghị ikpe ikpe ịkọrọ ahụmịhe gị banyere nkwarụ mmepe, ma ọ bụrụ na gị na ya bi ma ọ bụ na ị bụ nne na nna ma ọ bụ onye nlekọta. Akụkọ gị nwere ike ịgba onye ọzọ ume ma nyere ndị ọzọ aka ịghọta."],
 "storyPromise": ["Our promise","Alkawarinmu","Ìlérí wa","Nkwa anyị"],
 "storyPromise1": ["Be kind. There is no judgement and no comparing journeys.","Ka kasance mai kirki. Babu hukunci ko kwatanta tafiyoyi.","Jẹ́ onínúure. Kò sí ìdájọ́ tàbí fífi ìrírí wé ti ẹlòmíràn.","Nwee obiọma. Enweghị ikpe ikpe ma ọ bụ iji ahụmịhe atụnyere ibe ya."],
 "storyPromise2": ["Share your own experience. Leave out private details about other people, and never include a child’s full name or photo without a parent or guardian’s consent.","Raba naka labarin. Kada ka saka bayanan sirri na wasu, kuma kada ka saka cikakken sunan yaro ko hotonsa ba tare da izinin iyaye ko mai kula ba.","Pín ìrírí tìrẹ. Má ṣe fi àlàyé ìkọ̀kọ̀ nípa àwọn ẹlòmíràn kún un, má sì ṣe fi orúkọ kíkún tàbí fọ́tò ọmọ sí i láìgba àṣẹ òbí tàbí olùtọ́jú rẹ̀.","Kọọ naanị ahụmịhe nke gị. Etinyela nkọwa nzuzo gbasara ndị ọzọ, etinyekwala aha nwa zuru ezu ma ọ bụ foto ya n’enweghị nkwenye nne na nna ma ọ bụ onye nlekọta."],
 "storyPromise3": ["Stories are for encouragement and education, not medical advice.","Labarai na ƙarfafawa da ilimi ne, ba shawarar likita ba.","A ń pín ìtàn fún ìṣírí àti ẹ̀kọ́, kì í ṣe ìmọ̀ràn ìṣègùn.","Akụkọ bụ maka ịgba ume na agụmakwụkwọ, ọ bụghị ndụmọdụ ahụike."],
 "storyPromise4": ["You can share anonymously and ask us to remove your story at any time.","Za ka iya raba labari ba tare da bayyana sunanka ba, kuma ka nemi mu cire shi a kowane lokaci.","O lè pín láìsọ orúkọ rẹ, kí o sì ní kí a yọ ìtàn rẹ nígbàkigbà.","Ị nwere ike ịkọrọ n’amaghị aha ma rịọ ka anyị wepụ akụkọ gị n’oge ọ bụla."],
 "storyPromise5": ["If someone is in danger, contact your local emergency services.","Idan wani yana cikin haɗari, tuntuɓi jami’an gaggawa na yankinka.","Tí ẹnì kan bá wà nínú ewu, kàn sí àwọn iṣẹ́ pajawiri agbègbè rẹ.","Ọ bụrụ na mmadụ nọ n’ihe egwu, kpọtụrụ ndị ọrụ mberede mpaghara gị."],
 "storyReady": ["Ready to share?","Ka shirya ka raba?","Ṣé o ti múra láti pín?","Ị dịla njikere ịkọrọ?"],
 "storyReadyText": ["You can share anonymously, and nothing is published until our team has reviewed it with care.","Za ka iya raba ba tare da bayyana sunanka ba. Ba za a wallafa komai ba sai bayan ƙungiyarmu ta duba shi cikin kulawa.","O lè pín láìsọ orúkọ rẹ, a kì í sì í tẹ̀ ohunkóhun jáde títí ẹgbẹ́ wa yóò fi fara ṣe àyẹ̀wò rẹ dáadáa.","Ị nwere ike ịkọrọ n’amaghị aha, a gaghị ebipụta ihe ọ bụla ruo mgbe ndị otu anyị nyochachara ya nke ọma."],
 "storiesTitle": ["Stories from our community","Labarai daga al’ummarmu","Àwọn ìtàn láti àwùjọ wa","Akụkọ sitere n’obodo anyị"],
 "storiesLoading": ["Loading approved stories…","Ana loda labaran da aka amince da su…","À ń ṣí àwọn ìtàn tí a ti fọwọ́ sí…","Na-ebunye akụkọ ndị akwadoro…"],
 "storiesEmpty": ["Stories will appear here once they have been shared and approved.","Labarai za su bayyana a nan bayan an raba su kuma an amince da su.","Àwọn ìtàn yóò fara hàn níbí lẹ́yìn tí a bá pín wọn tí a sì fọwọ́ sí wọn.","Akụkọ ga-apụta ebe a mgbe e kesachara ha ma kwado ha."],
 "storyText": ["Your story","Labarinka","Ìtàn rẹ","Akụkọ gị"],
 "storyName": ["Name to display (optional)","Sunan da za a nuna (zaɓi ne)","Orúkọ láti fi hàn (àṣàyàn ni)","Aha a ga-egosi (nhọrọ)"],
 "storyState": ["State (optional)","Jiha (zaɓi ne)","Ìpínlẹ̀ (àṣàyàn ni)","Steeti (nhọrọ)"],
 "storyPrefer": ["Prefer not to say","Na fi so kada in faɗa","Mi ò fẹ́ sọ","Achọghị m ikwu"],
 "storyAnonymous": ["Share anonymously","Raba ba tare da bayyana suna ba","Pín láìsọ orúkọ","Kọọ n’amaghị aha"],
 "storyConsent": ["I agree that my story may be published after review.","Na yarda a iya wallafa labarina bayan an duba shi.","Mo gbà pé a lè tẹ̀ ìtàn mi jáde lẹ́yìn àyẹ̀wò.","Ekwenyere m na a ga-ebipụta akụkọ m mgbe nyochachara ya."],
 "humanVerify": ["Complete the human verification before submitting.","Kammala tantance mutum kafin aikawa.","Parí ìmúdájú pé ènìyàn ni ọ kí o tó fi ránṣẹ́.","Mechaa nkwenye mmadụ tupu izipu."],
 "humanLoadError": ["Human verification could not load. Please try again.","Ba a iya loda tantance mutum ba. Da fatan za a sake gwadawa.","Ìmúdájú ènìyàn kò lè ṣí. Jọ̀wọ́ tún gbìyànjú.","Nkwenye mmadụ ebughị. Biko nwaa ọzọ."],
 "storySending": ["Sending…","Ana aikawa…","Ó ń ránṣẹ́…","Na-ezipụ…"],
 "storySubmit": ["Submit my story","Aika labarina","Fi ìtàn mi ránṣẹ́","Zipu akụkọ m"],
 "storyThanks": ["Thank you. Your story has been received for review and will not be published until approved.","Na gode. Mun karɓi labarinka don dubawa; ba za a wallafa shi ba sai an amince da shi.","O ṣeun. A ti gba ìtàn rẹ fún àyẹ̀wò; a kì í tẹ̀ ẹ́ jáde títí a ó fi fọwọ́ sí i.","Daalụ. Anyị anatala akụkọ gị maka nyocha; a gaghị ebipụta ya ruo mgbe akwadoro ya."],
 "partnerIntro": ["Tell us who you are and how you would like to work with us.","Faɗa mana ko kai wane ne da yadda kake son yin aiki tare da mu.","Sọ fún wa ẹni tí o jẹ́ àti bí o ṣe fẹ́ bá wa ṣiṣẹ́.","Gwa anyị onye ị bụ na otu ị ga-esi arụkọ ọrụ na anyị."],
 "partnerName": ["Name","Suna","Orúkọ","Aha"],
 "partnerOrgOptional": ["Organisation (optional)","Ƙungiya (zaɓi ne)","Ẹgbẹ́ (àìgbọdọ̀máṣe)","Òtù (nhọrọ)"],
 "partnerHow": ["How would you like to work with us?","Yaya kake son yin aiki tare da mu?","Báwo ni o ṣe fẹ́ bá wa ṣiṣẹ́?","Kedu ka ị ga-achọ isi rụkọọ ọrụ na anyị?"],
 "partnerSending": ["Sending…","Ana aikawa…","Ó ń ránṣẹ́…","Na-ezipụ…"],
 "partnerSubmit": ["Send inquiry","Aika tambaya","Fi ìbéèrè ránṣẹ́","Zipu ajụjụ"],
 "partnerThanks": ["Thank you. Your inquiry has been received.","Na gode. Mun karɓi tambayarka.","O ṣeun. A ti gba ìbéèrè rẹ.","Daalụ. Anyị anatala ajụjụ gị."],
 "libraryIntro": ["Reading, watching and creative work to learn from. The articles, books and videos are recommended from trusted outside sources. The creative corner is made by Nurospectrum.","Abubuwan karatu, kallo da ƙirƙira don koyo. An ba da shawarar labarai, littattafai da bidiyo daga amintattun tushe. Nurospectrum ce ta ƙirƙiri sashe na ƙirƙira.","Àwọn ohun ìkàwé, fíìmù àti iṣẹ́ ọnà láti kẹ́kọ̀ọ́. Àwọn àpilẹ̀kọ, ìwé àti fídíò jẹ́ àbá láti ọ̀dọ̀ àwọn orísun tó ṣeé gbẹ́kẹ̀lé. Nurospectrum ló ṣe apá ìṣẹ̀dá.","Ihe ịgụ, ikiri na ọrụ okike ị ga-amụta na ha. A tụrụ aro maka edemede, akwụkwọ na vidio ndị sitere na isi iyi a pụrụ ịtụkwasị obi. Nurospectrum mepụtara akụkụ okike."],
 "libArticles": ["Articles and research","Labarai da bincike","Àwọn àpilẹ̀kọ àti ìwádìí","Edemede na nyocha"],
 "libBooks": ["Books and magazines","Littattafai da mujallu","Ìwé àti àwọn ìwé ìròyìn","Akwụkwọ na magazin"],
 "libVideos": ["Videos","Bidiyo","Fídíò","Vidio"],
 "libCreative": ["Creative corner","Sashen ƙirƙira","Apá ìṣẹ̀dá","Akụkụ okike"],
 "libMoreVideos": ["More to watch","Ƙarin kallo","Àwọn míì láti wò","Ihe ọzọ ị ga-ekiri"],
 "libVideoDescription": ["An autistic research psychologist explains the neurodiversity paradigm, the social model of disability and the double empathy problem, and why we need to rethink how autism is understood.","Wata masaniyar bincike mai autism ta bayyana tsarin neurodiversity, tsarin zamantakewa na nakasa da matsalar fahimtar juna, da dalilin da ya sa ya kamata mu sake tunani game da autism.","Onímọ̀-ẹ̀kọ́ ìwádìí autistic kan ṣàlàyé èrò neurodiversity, àwòṣe àwùjọ ti àìlera àti ìṣòro ìfòyemọ̀ ara ẹni méjèèjì, àti ìdí tí a fi yẹ kí a tún wo bí a ṣe lóye autism.","Onye ọkà n’akparamaagwa nyocha nke nwere autism kọwara echiche neurodiversity, usoro mmekọrịta mmadụ na ibe ya banyere nkwarụ na nsogbu nghọta n’etiti mmadụ abụọ, nakwa ihe mere anyị ji kwesị ịtụgharị uche banyere autism."],
 "libWatch": ["Watch on YouTube ↗","Kalli a YouTube ↗","Wò ó lórí YouTube ↗","Lelee na YouTube ↗"],
 "libCreativeIntro": ["Illustrations, graphics, songs and rhymes made by Nurospectrum to teach, comfort and empower.","Zane-zane, hotuna, waƙoƙi da baitoci da Nurospectrum ta ƙirƙira don koyarwa, ta'aziyya da ƙarfafawa.","Àwọn àwòrán, orin àti ewì tí Nurospectrum ṣe láti kọ́ni, tùni nínú àti fúnni ní agbára.","Ihe osise, eserese, egwu na abụ Nurospectrum mere iji kuzie ihe, kasie obi ma nye mmadụ ike."],
 "libIllustrations": ["Illustrations and graphics","Zane-zane da hotuna","Àwọn àwòrán àti àwòrán aláwò","Ihe osise na eserese"],
 "libArtAlt": ["Four overlapping coloured circles","Da'irori huɗu masu launuka da suka mamaye juna","Àwọn àyíká aláwọ̀ mẹ́rin tó bo ara wọn","Okirikiri anọ nwere agba na-ekpuchi ibe ha"],
 "libArtCaption": ["Many minds, one community.","Tunani da yawa, al’umma ɗaya.","Ọ̀pọ̀lọpọ̀ ọkàn, àwùjọ kan.","Ọtụtụ uche, otu obodo."],
 "libSongs": ["Songs and rhymes","Waƙoƙi da baitoci","Orin àti ewì","Egwu na abụ"],
 "libPoemTitle": ["Many Minds","Tunani da yawa","Ọ̀pọ̀lọpọ̀ ọkàn","Ọtụtụ uche"],
 "libPoem1": ["Some minds race like a market day,","Wasu tunani suna sauri kamar ranar kasuwa,","Àwọn ọkàn kan yára bí ọjọ́ ọjà,","Ụfọdụ uche na-agba ọsọ dịka ụbọchị ahịa,"],
 "libPoem2": ["Some take the long and quiet way,","Wasu suna tafiya a hankali cikin natsuwa,","Àwọn kan ń gba ọ̀nà gígùn tí kò ní ariwo,","Ụfọdụ na-aga nwayọ n’ụzọ dị jụụ,"],
 "libPoem3": ["Some see patterns, some hear a song,","Wasu suna ganin tsari, wasu suna jin waƙa,","Àwọn kan ń rí àwòṣe, àwọn kan sì ń gbọ́ orin,","Ụfọdụ na-ahụ usoro, ụfọdụ na-anụ egwu,"],
 "libPoem4": ["Every mind helps us belong.","Kowane tunani yana taimaka mana mu kasance tare.","Gbogbo ọkàn ló ń ran wa lọ́wọ́ láti wà ní ìṣọ̀kan.","Uche ọ bụla na-enyere anyị aka ịdị n’otu."],
 "libContribute": ["Make illustrations, songs or rhymes?","Kana ƙirƙirar zane, waƙoƙi ko baitoci?","Ṣé o ń ṣe àwòrán, orin tàbí ewì?","Ị na-eme ihe osise, egwu ma ọ bụ abụ?"],
 "libContributeLink": ["Contribute to the creative corner","Ba da gudummawa ga sashen ƙirƙira","Ṣèrànwọ́ fún apá ìṣẹ̀dá","Tinye aka n’akụkụ okike"],
 "resourceOpen": ["Open","Buɗe","Ṣí i","Mepee"],
 "resourceSearchScholar": ["Search Google Scholar","Nemo a Google Scholar","Wá a Google Scholar","Chọọ na Google Scholar"],
 "resourceSearchBooks": ["Search Open Library","Nemo a Open Library","Wá a Open Library","Chọọ na Open Library"],
 "resourceSearchVideo": ["Search TED","Nemo a TED","Wá a TED","Chọọ na TED"],
 "libEmptyArticles": ["No articles or research resources are available yet.","Babu labarai ko kayan bincike tukuna.","A kò tíì ní àpilẹ̀kọ tàbí ohun ìwádìí.","Enweghị edemede ma ọ bụ ihe nyocha ugbu a."],
 "libEmptyBooks": ["No books or magazines are available yet.","Babu littattafai ko mujallu tukuna.","A kò tíì ní ìwé tàbí ìwé ìròyìn.","Enweghị akwụkwọ ma ọ bụ magazin ugbu a."],
 "libEmptyVideos": ["No additional videos are available yet.","Babu ƙarin bidiyo tukuna.","A kò tíì ní àwọn fídíò míì.","Enweghị vidio ndị ọzọ ugbu a."],
 "libLoading": ["Loading library…","Ana loda ɗakin karatu…","À ń ṣí ilé ìkàwé…","Na-ebunye ọba akwụkwọ…"],
 "libVideoTitle": ["Why everything you know about autism is wrong","Dalilin da ya sa duk abin da ka sani game da autism ba daidai ba ne","Ìdí tí ohun gbogbo tí o mọ̀ nípa autism kò fi tọ́","Ihe mere ihe niile ị maara gbasara autism ji ezighị ezi"],
 "newTab": ["opens in a new tab","yana buɗewa a sabon shafi","ó ṣí ní táàbù tuntun","na-emepe na taabụ ọhụrụ"],
 "eventLoading": ["Loading events…","Ana loda abubuwan da ke tafe…","À ń ṣí àwọn ìṣẹ̀lẹ̀…","Na-ebunye ihe omume…"],
 "eventEmpty": ["There are no upcoming events yet.","Babu abubuwan da ke tafe tukuna.","Kò tíì sí ìṣẹ̀lẹ̀ kankan tó ń bọ̀.","Enweghị ihe omume na-abịa ugbu a."],
 "online": ["Online","A yanar gizo","Lórí ayélujára","N’ịntanetị"],
 "blogLoading": ["Loading articles…","Ana loda labarai…","À ń ṣí àwọn àpilẹ̀kọ…","Na-ebunye edemede…"],
 "blogEmpty": ["There are no published articles yet.","Babu labaran da aka wallafa tukuna.","A kò tíì tẹ àpilẹ̀kọ kankan jáde.","Enweghị edemede e bipụtara ugbu a."],
 "more": ["More to read","Ƙarin karantawa","Ìwé míràn láti kà","Ihe ọzọ ị ga-agụ"],
 "themeDark": ["Dark mode","Yanayin duhu","Ìrísí òkùnkùn","Ọnọdụ ọchịchịrị"],
 "themeLight": ["Light mode","Yanayin haske","Ìrísí ìmọ́lẹ̀","Ọnọdụ ìhè"],
 "language": ["Language","Harshe","Èdè","Asụsụ"],
 "mainNav": ["Main navigation","Babban menu","Àtòkọ àkọ́kọ́","Nnyocha isi"],
 "articleLoading": ["Loading article…","Ana loda labarin…","À ń ṣí àpilẹ̀kọ…","Na-ebunye edemede…"],
 "articleNotFound": ["Article not found.","Ba a sami labarin ba.","A kò rí àpilẹ̀kọ náà.","Ahụghị edemede ahụ."]
}

// Lists that are arrays per language: LISTS[key][languageIndex][itemIndex]
export const LISTS: Record<string, string[][]> = {
 "nav": [
  [
   "Home",
   "Blog",
   "Community",
   "Library",
   "Partner with us"
  ],
  [
   "Gida",
   "Bulogi",
   "Al’umma",
   "Ɗakin karatu",
   "Haɗa kai da mu"
  ],
  [
   "Ilé",
   "Bulọọgi",
   "Àwùjọ",
   "Ilé ìkàwé",
   "Bá wa ṣiṣẹ́"
  ],
  [
   "Home",
   "Blọọgụ",
   "Obodo",
   "Ọba akwụkwọ",
   "Soro anyị rụkọọ ọrụ"
  ]
 ],
 "roles": [
  [
   "A neurodivergent person",
   "A parent, carer or family member",
   "A teacher or professional",
   "An ally"
  ],
  [
   "Mai bambancin kwakwalwa",
   "Iyaye, mai kula ko dangi",
   "Malami ko ƙwararre",
   "Aboki mai goyon baya"
  ],
  [
   "Ẹni tí ọpọlọ rẹ̀ yàtọ̀",
   "Òbí, olùtọ́jú tàbí ẹbí",
   "Olùkọ́ tàbí ọ̀jọ̀gbọ́n",
   "Alátìlẹ́yìn"
  ],
  [
   "Onye ụbụrụ ya dị iche",
   "Nne ma ọ bụ nna, onye na-elekọta ma ọ bụ ezinụlọ",
   "Onye nkụzi ma ọ bụ ọkachamara",
   "Onye na-akwado"
  ]
 ],
 "io": [
  [
   "Partner with Nurospectrum",
   "Invest or fund",
   "Contribute my skills"
  ],
  [
   "Haɗa kai da Nurospectrum",
   "Zuba jari ko tallafa",
   "Ba da gudummawar ƙwarewa"
  ],
  [
   "Bá Nurospectrum ṣiṣẹ́ pọ̀",
   "Náwó tàbí ṣe àtìlẹ́yìn owó",
   "Pín ọgbọ́n mi"
  ],
  [
   "Soro Nurospectrum rụkọọ ọrụ",
   "Tinye ego ma ọ bụ kwado",
   "Keta ọgụgụ isi m"
  ]
 ]
}

export const POSTS: Post[] = [
 {
  "id": "post-words",
  "tag": "Basics",
  "c": "indigo",
  "title": "Neurodiverse or neurodivergent? The words matter",
  "dek": "Two similar words with different meanings, and why we use both.",
  "b": [
   "Neurodiversity describes the natural variation in how human brains work. It is a fact about a group, like biodiversity. A classroom, a family or a country can be neurodiverse.",
   "Neurodivergent describes an individual whose brain works differently from what is typically expected. That includes people who are autistic, have ADHD or dyslexia, and others. The term neurotypical describes people whose thinking fits that typical expectation.",
   "The word neurodiversity was popularised in the late 1990s by the sociologist Judy Singer. The idea behind it is simple: differences in thinking are part of human variety, and people do better when environments adapt instead of expecting everyone to fit one mould."
  ],
  "n": "A person is neurodivergent. A community is neurodiverse.",
  "s": "Singer, J. (1999). “Why can’t you be normal for once in your life?” In Disability Discourse. Open University Press.",
  "slug": "words"
 },
 {
  "id": "post-class",
  "tag": "Education",
  "c": "green",
  "title": "Five signs a classroom isn’t working for a neurodivergent student",
  "dek": "Often it is not about effort. It is about the environment.",
  "b": [
   "A student who looks distracted, restless or withdrawn may be reacting to noise, unclear instructions or long stretches of passive listening. Labelling them lazy hides the real cause.",
   "Watch for repeated incomplete work despite clear ability, strong distress at changes in routine, avoiding reading or writing aloud, difficulty following spoken multi-step instructions, and exhaustion after school.",
   "Many helpful changes cost nothing: written and spoken instructions together, a quiet corner, extra time, and breaking tasks into steps. The Universal Design for Learning framework recommends offering more than one way to take in information and show understanding."
  ],
  "n": "Change the task or space first, then judge the student.",
  "s": "CAST (2018). Universal Design for Learning Guidelines version 2.2. udlguidelines.cast.org",
  "slug": "class"
 },
 {
  "id": "post-work",
  "tag": "Work",
  "c": "gold",
  "title": "How to support a neurodivergent colleague",
  "dek": "Small, specific adjustments, agreed with the person, go a long way.",
  "b": [
   "Do not guess what someone needs. Ask: what helps you do your best work? Needs differ widely, even between two people with the same diagnosis.",
   "Common adjustments include written follow-ups after meetings, agendas shared in advance, flexible hours, quieter workspaces and clear, direct feedback.",
   "Research on neurodiversity at work argues that many neurodivergent people bring strengths such as sustained focus, pattern recognition and creative problem solving, but that these show up only when the workplace fits them. Treat strengths and support needs as both true."
  ],
  "n": "Ask, agree, write it down, and review it together.",
  "s": "Doyle, N. (2020). Neurodiversity at work: a biopsychosocial model and the impact on working adults. British Medical Bulletin, 135(1), 108–125.",
  "slug": "work"
 },
 {
  "id": "post-assess",
  "tag": "Support",
  "c": "rose",
  "title": "If you think your child may be neurodivergent, where to start",
  "dek": "A calm first-steps guide for parents and carers.",
  "b": [
   "Write down what you notice at home and at school: when it happens, how often and what helps. Specific examples are more useful to a professional than general worries.",
   "Speak to your child’s teacher and then to a qualified professional, such as a paediatrician, child psychiatrist or clinical psychologist. Diagnosis should come from a trained clinician, not from online checklists.",
   "The World Health Organization’s ICD-11 describes autism spectrum disorder and ADHD under neurodevelopmental conditions, and clinicians use criteria like these when assessing. While you wait, you can already adjust routines, reduce sensory overload and keep communication kind and clear."
  ],
  "n": "You do not need a diagnosis to start helping.",
  "s": "World Health Organization (2019). ICD-11, Chapter 6: Neurodevelopmental disorders. icd.who.int",
  "slug": "assess"
 }
]

export const EVENTS: EventItem[] = [
 {
  "d": "14",
  "m": "Nov",
  "c": "green"
 },
 {
  "d": "05",
  "m": "Dec",
  "c": "indigo"
 },
 {
  "d": "23",
  "m": "Jan",
  "c": "rose"
 }
]

export const STATES: string[] = [
 "Abia",
 "Adamawa",
 "Akwa Ibom",
 "Anambra",
 "Bauchi",
 "Bayelsa",
 "Benue",
 "Borno",
 "Cross River",
 "Delta",
 "Ebonyi",
 "Edo",
 "Ekiti",
 "Enugu",
 "FCT Abuja",
 "Gombe",
 "Imo",
 "Jigawa",
 "Kaduna",
 "Kano",
 "Katsina",
 "Kebbi",
 "Kogi",
 "Kwara",
 "Lagos",
 "Nasarawa",
 "Niger",
 "Ogun",
 "Ondo",
 "Osun",
 "Oyo",
 "Plateau",
 "Rivers",
 "Sokoto",
 "Taraba",
 "Yobe",
 "Zamfara"
]
