import type { Photo } from "@/content/types";

/**
 * Stock photography from Unsplash (free under the Unsplash License). None of these
 * come from the content document or show the clinic, its staff or its patients, so
 * alt text describes the image only. Replace with real clinic photos when available.
 */
const unsplash = (id: string, width: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=70`;

const photo = (id: string, alt: string, width = 1600): Photo => ({ src: unsplash(id, width), alt });

export const PHOTOS = {
  heroTreatment: photo("1684607633138-6cc13613369b", ""),
  smilingPatient: photo("1684607632599-748b1792a116", "A smiling woman in a dental clinic", 1100),
  whiteningTreatment: photo(
    "1684607633080-df59e6874367",
    "A patient wearing tinted safety glasses during a teeth whitening treatment"
  ),
  smileCloseUp: photo("1758710199830-a679965cdbf4", "Close-up of a woman’s smile"),
  patientInChair: photo(
    "1684607632888-3f05307f9007",
    "A dentist in black gloves treating a patient reclining in a dental chair"
  ),
  dentalNurseTreating: photo(
    "1684607632687-50fd26c8a186",
    "A dental professional in a cap and mask treating a patient in a dental chair"
  ),
  dentistTreatingMouth: photo(
    "1684607633251-8a4a8d94ddd2",
    "A dentist in gloves and a cap working on a patient’s teeth"
  ),
  showingSmile: photo("1702677853335-753dac3ee8e4", "A young man smiling and pointing at his teeth"),
  brushingTeeth: photo("1646457411048-93db3b3abd14", "A smiling woman brushing her teeth", 1100),
  smileInMirror: photo(
    "1684607632041-32d729cdee35",
    "A patient checking his smile in a hand mirror beside a dentist",
    1100
  ),
  dentistPortrait: photo("1672655412906-8e10ba6ee373", "A dentist in a white coat seated in a dental clinic"),
  cleaningTeeth: photo(
    "1684607633217-462056580c3c",
    "A dentist cleaning a patient’s teeth with a dental instrument and suction"
  ),
  touchingJaw: photo("1684607633024-f1a2179118fa", "A smiling man touching his jaw"),
  healthyTeeth: photo("1660732205495-f65510d8180e", "Close-up of upper and lower front teeth"),
  treatmentRoomArt: photo(
    "1643660526741-094639fbe53a",
    "A dental treatment room with a blue chair and a painting on the wall"
  ),
  dentalMirror: photo("1698749778813-ad5f2814e50f", "A dental mirror held up in front of a dental chair"),
  clinicWide: photo("1629909615184-74f495363b67", "A bright, modern dental clinic with treatment chairs"),
  clinicRoom: photo("1629909613654-28e377c37b09", "A dental treatment room with a teal patient chair"),
  orangeChairRoom: photo("1598256989800-fe5f95da9787", "A dental treatment room with an orange patient chair"),
} satisfies Record<string, Photo>;
