import { Injectable } from '@angular/core';

export interface ProjectStats {
  offices: number;
  parkings: number;
  villas: number;
  models: number;
  units: number;
  exhibitionsShowrooms: number;
  floors: number;
}

export interface ProjectUnit {
  unitId: number;
  name: { en: string; ar: string };
  area: string;
  floor: string;
}

export interface Project {
  id: string;
  category: 'ongoing' | 'completed' | 'upcoming';
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  type: { en: string; ar: string };
  location: { en: string; ar: string };
  locationUrl: string;
  area: string;
  stats: ProjectStats;
  Units: ProjectUnit[];
  image?: string;
  images?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private selectedProject: Project | null = null;

  projects: Project[] = [
    {
      id: "project9",
      category: "upcoming",
      name: { en: "VERTICA", ar: "ڤيرتيكا" },
      description: {
        en: "A modern shopping experience full of fun and inspiration.",
        ar: "تجربة تسوق عصرية، مليئة بالمرح والإلهام."
      },
      type: { en: "Commercial", ar: "تجاري" },
      location: { en: "Al-Falah District", ar: "حي الفلاح" },
      locationUrl: "https://www.google.com/maps?q=24.7988593,46.7184883",
      area: "5046",
      stats: { offices: 14, parkings: 0, villas: 0, models: 0, units: 0, exhibitionsShowrooms: 6, floors: 0 },
      Units: [
        { unitId: 1, name: { en: "Showroom 01", ar: "معرض 01" }, area: "198", floor: "0" },
        { unitId: 2, name: { en: "Showroom 02", ar: "معرض 02" }, area: "198", floor: "0" },
        { unitId: 3, name: { en: "Showroom 03", ar: "معرض 03" }, area: "194", floor: "0" },
        { unitId: 4, name: { en: "Showroom 04", ar: "معرض 04" }, area: "194", floor: "0" },
        { unitId: 5, name: { en: "Showroom 05", ar: "معرض 05" }, area: "198", floor: "0" },
        { unitId: 6, name: { en: "Showroom 06", ar: "معرض 06" }, area: "198", floor: "0" },
        { unitId: 7, name: { en: "Office 01", ar: "مكتب 01" }, area: "445", floor: "1" },
        { unitId: 8, name: { en: "Office 02", ar: "مكتب 02" }, area: "349", floor: "1" },
        { unitId: 9, name: { en: "Office 03", ar: "مكتب 03" }, area: "245.50", floor: "1" },
        { unitId: 10, name: { en: "Office 04", ar: "مكتب 04" }, area: "280", floor: "1" },
        { unitId: 11, name: { en: "Office 05", ar: "مكتب 05" }, area: "206", floor: "1" },
        { unitId: 12, name: { en: "Office 06", ar: "مكتب 06" }, area: "283", floor: "1" },
        { unitId: 13, name: { en: "Office 07", ar: "مكتب 07" }, area: "283", floor: "1" },
        { unitId: 14, name: { en: "Office 08", ar: "مكتب 08" }, area: "206", floor: "1" },
        { unitId: 15, name: { en: "Office 09", ar: "مكتب 09" }, area: "280", floor: "1" },
        { unitId: 16, name: { en: "Office 10", ar: "مكتب 10" }, area: "245", floor: "1" },
        { unitId: 17, name: { en: "Showroom 11", ar: "معرض 11" }, area: "302", floor: "2" },
        { unitId: 18, name: { en: "Showroom 12", ar: "معرض 12" }, area: "218", floor: "2" },
        { unitId: 19, name: { en: "Showroom 13", ar: "معرض 13" }, area: "218", floor: "2" },
        { unitId: 20, name: { en: "Showroom 14", ar: "معرض 14" }, area: "302", floor: "2" }
      ],
      images: [
        "assets/VERTICA Mall/vertica-1-main.jpg",
        "assets/VERTICA Mall/vertica-2.jpg",
        "assets/VERTICA Mall/vertica-3.jpg",
        "assets/VERTICA Mall/vertica-4.jpg",
        "assets/VERTICA Mall/vertica-5.jpg",
        "assets/VERTICA Mall/vertica-6.jpg"
      ],
    },
    {
      id: "project10",
      category: "upcoming",
      name: { en: "ARVY Tower", ar: "برج آرڤي" },
      description: {
        en: "Your workspace, with modern inspiration and a unique experience.",
        ar: "مساحة عملك، بإلهام عصري وتجربة مختلفة."
      },
      type: { en: "Commercial", ar: "تجاري" },
      location: { en: "Al-Quds District", ar: "حي القدس" },
      locationUrl: "https://www.google.com/maps?q=RAJA6499%D8%8C+6499",
      area: "4634",
      stats: { offices: 10, parkings: 102, villas: 0, models: 0, units: 0, exhibitionsShowrooms: 2, floors: 5 },
      Units: [
        { unitId: 1, name: { en: "Showroom 01", ar: "معرض 01" }, area: "421", floor: "0" },
        { unitId: 2, name: { en: "Showroom 02", ar: "معرض 02" }, area: "421", floor: "0" },
        { unitId: 3, name: { en: "Office 01", ar: "مكتب 01" }, area: "384", floor: "1" },
        { unitId: 4, name: { en: "Office 02", ar: "مكتب 02" }, area: "384", floor: "1" },
        { unitId: 5, name: { en: "Office 03", ar: "مكتب 03" }, area: "374", floor: "2" },
        { unitId: 6, name: { en: "Office 04", ar: "مكتب 04" }, area: "374", floor: "2" },
        { unitId: 7, name: { en: "Office 05", ar: "مكتب 05" }, area: "374", floor: "2" },
        { unitId: 8, name: { en: "Office 06", ar: "مكتب 06" }, area: "374", floor: "2" },
        { unitId: 9, name: { en: "Office 07", ar: "مكتب 07" }, area: "374", floor: "3" },
        { unitId: 10, name: { en: "Office 08", ar: "مكتب 08" }, area: "374", floor: "3" },
        { unitId: 11, name: { en: "Office 09", ar: "مكتب 09" }, area: "390", floor: "4" },
        { unitId: 12, name: { en: "Office 10", ar: "مكتب 10" }, area: "390", floor: "4" }
      ],
      images: [
        "assets/ARVY/arvy-1-main.jpg",
        "assets/ARVY/arvy-2.jpg",
        "assets/ARVY/arvy-3.jpg"
      ],
    },
    {
      id: "project11",
      category: "upcoming",
      name: { en: "Narjis Heights", ar: "نرجس هايتس" },
      description: {
        en: "Spacious layouts, elegant design, and the perfect setting for complete family living.",
        ar: "مساحات واسعة، تصميم فاخر، ومكان مثالي لحياة عائلية متكاملة."
      },
      type: { en: "Residential", ar: "سكني" },
      location: { en: "Al-Narjis District", ar: "حي النرجس" },
      locationUrl: "https://www.google.com/maps?q=RAJA6499%D8%8C+6499",
      area: "6043",
      stats: { offices: 0, parkings: 0, villas: 18, models: 0, units: 0, exhibitionsShowrooms: 0, floors: 0 },
      Units: [
        { unitId: 1, name: { en: "Villa 1", ar: "فيلا 1" }, area: "349", floor: "0" },
        { unitId: 2, name: { en: "Villa 2", ar: "فيلا 2" }, area: "333", floor: "0" },
        { unitId: 3, name: { en: "Villa 3", ar: "فيلا 3" }, area: "333", floor: "0" },
        { unitId: 4, name: { en: "Villa 4", ar: "فيلا 4" }, area: "333", floor: "0" },
        { unitId: 5, name: { en: "Villa 5", ar: "فيلا 5" }, area: "333", floor: "0" },
        { unitId: 6, name: { en: "Villa 6", ar: "فيلا 6" }, area: "349", floor: "0" },
        { unitId: 7, name: { en: "Villa 7", ar: "فيلا 7" }, area: "333", floor: "0" },
        { unitId: 8, name: { en: "Villa 8", ar: "فيلا 8" }, area: "333", floor: "0" },
        { unitId: 9, name: { en: "Villa 9", ar: "فيلا 9" }, area: "333", floor: "0" },
        { unitId: 10, name: { en: "Villa 10", ar: "فيلا 10" }, area: "333", floor: "0" },
        { unitId: 11, name: { en: "Villa 11", ar: "فيلا 11" }, area: "298", floor: "0" },
        { unitId: 12, name: { en: "Villa 12", ar: "فيلا 12" }, area: "281", floor: "0" },
        { unitId: 13, name: { en: "Villa 13", ar: "فيلا 13" }, area: "281", floor: "0" },
        { unitId: 14, name: { en: "Villa 14", ar: "فيلا 14" }, area: "281", floor: "0" },
        { unitId: 15, name: { en: "Villa 15", ar: "فيلا 15" }, area: "368", floor: "0" },
        { unitId: 16, name: { en: "Villa 16", ar: "فيلا 16" }, area: "368", floor: "0" },
        { unitId: 17, name: { en: "Villa 17", ar: "فيلا 17" }, area: "280", floor: "0" },
        { unitId: 18, name: { en: "Villa 18", ar: "فيلا 18" }, area: "280", floor: "0" }
      ],
      images: [
        "assets/NARJIS Heights/nargish-1-main.jpg",
        "assets/NARJIS Heights/nargish-2.jpg",
        "assets/NARJIS Heights/nargish-3.jpg"
      ],
      image: "assets/project.png"
    },
    {
      id: "project1",
      category: "ongoing",
      name: { en: "Emaar Villas", ar: "فلل الإعمار" },
      description: {
        en: "Elegant villas combining luxury, technology, and comprehensive services.",
        ar: "فلل فاخرة تجمع بين الفخامة، التكنولوجيا، والخدمات المتكاملة."
      },
      type: { en: "Residential", ar: "سكني" },
      location: { en: "Al-Narjis District", ar: "حي النرجس" },
      locationUrl: "https://www.google.com/maps?q=RAJB2980%D8%8C+2980+%D9%85%D8%AD%D9%85%D8%AF+%D8%A3%D8%A8%D9%8A+%D8%A7%D9%84%D8%B3%D8%B9%D8%A7%D8%AF%D8%A7%D8%AA+%D8%A7%D9%84%D8%B7%D8%A8%D8%B1%D9%8A%D8%8C+6883%D8%8C+%D8%AD%D9%8A+%D8%A7%D9%84%D9%86%D8%B1%D8%AC%D8%B3%D8%8C+%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6+13339&ftid=0x3e2eef8760436c87:0x2e6cf8799a5edf01",
      area: "7182",
      stats: { offices: 0, parkings: 0, villas: 14, models: 2, units: 0, exhibitionsShowrooms: 0, floors: 0 },
      Units: [
        { unitId: 1, name: { en: "Model 1", ar: "نموذج 1" }, area: "364", floor: "0" },
        { unitId: 2, name: { en: "Model 2", ar: "نموذج 2" }, area: "351", floor: "0" }
      ],
      images: [
        "assets/emmar/emaar-v-1-main.jpg",
        "assets/emmar/emaar-v-2.jpg",
        "assets/emmar/emaar-v-3.jpg",
        "assets/emmar/emaar-v-4.jpg",
        "assets/emmar/emaar-v-5.jpg",
        "assets/emmar/emaar-v-6.jpg",
        "assets/emmar/emaar-v-7.jpg",
        "assets/emmar/emaar-v-8.jpg",
        "assets/emmar/emaar-v-9.jpg",
        "assets/emmar/emaar-v-10.jpg",
        "assets/emmar/emaar-v-11.jpg",
        "assets/emmar/emaar-v-12.jpg",
        "assets/emmar/emaar-v-13.jpg",
        "assets/emmar/emaar-v-14.jpg",
        "assets/emmar/emaar-v-15.jpg",
        "assets/emmar/emaar-v-16.jpg",
        "assets/emmar/emaar-v-17.jpg",
        "assets/emmar/emaar-v-18.jpg",
        "assets/emmar/emaar-v-19.jpg"
      ]
    },
    {
      "id": "project12",
      "category": "ongoing",
      "name": {
        "en": "Twin Tower 3",
        "ar": "برج التوأم 3"
      },
      "description": {
        "en": "",
        "ar": ""
      },
      "type": {
        "en": "Commercial",
        "ar": "تجاري"
      },
      "location": {
        "en": "Al-Quds District",
        "ar": "حي القدس"
      },
      "locationUrl": "",
      "area": "6563",
      "stats": {
        "offices": 27,
        "parkings": 0,
        "villas": 0,
        "models": 0,
        "units": 0,
        "exhibitionsShowrooms": 5,
        "floors": 0
      },
      "Units": [
        { "unitId": 1, "name": { "en": "Exhibition 1", "ar": "معرض 1" }, "area": "324", "floor": "0" },
        { "unitId": 2, "name": { "en": "Exhibition 2", "ar": "معرض 2" }, "area": "346", "floor": "0" },
        { "unitId": 3, "name": { "en": "Exhibition 3", "ar": "معرض 3" }, "area": "123", "floor": "0" },
        { "unitId": 4, "name": { "en": "Exhibition 4", "ar": "معرض 4" }, "area": "115", "floor": "0" },
        { "unitId": 5, "name": { "en": "Exhibition 5", "ar": "معرض 5" }, "area": "163", "floor": "0" },
        {
          "unitId": 6,
          "name": {
            "en": "Office 1",
            "ar": "مكتب 1"
          },
          "area": "387",
          "floor": "1"
        },
        {
          "unitId": 7,
          "name": {
            "en": "Office 2",
            "ar": "مكتب 2"
          },
          "area": "359",
          "floor": "1"
        },
        {
          "unitId": 8,
          "name": {
            "en": "Office 3",
            "ar": "مكتب 3"
          },
          "area": "128",
          "floor": "1"
        },
        {
          "unitId": 9,
          "name": {
            "en": "Office 4",
            "ar": "مكتب 4"
          },
          "area": "125",
          "floor": "1"
        },
        {
          "unitId": 10,
          "name": {
            "en": "Office 5",
            "ar": "مكتب 5"
          },
          "area": "154",
          "floor": "1"
        },
        {
          "unitId": 11,
          "name": {
            "en": "Office 6",
            "ar": "مكتب 6"
          },
          "area": "147",
          "floor": "1"
        },
        {
          "unitId": 12,
          "name": {
            "en": "Office 7",
            "ar": "مكتب 7"
          },
          "area": "407",
          "floor": "2"
        },
        {
          "unitId": 13,
          "name": {
            "en": "Office 8",
            "ar": "مكتب 8"
          },
          "area": "360",
          "floor": "2"
        },
        {
          "unitId": 14,
          "name": {
            "en": "Office 9",
            "ar": "مكتب 9"
          },
          "area": "125",
          "floor": "2"
        },
        {
          "unitId": 15,
          "name": {
            "en": "Office 10",
            "ar": "مكتب 10"
          },
          "area": "135",
          "floor": "2"
        },
        {
          "unitId": 16,
          "name": {
            "en": "Office 11",
            "ar": "مكتب 11"
          },
          "area": "161",
          "floor": "2"
        },
        {
          "unitId": 17,
          "name": {
            "en": "Office 12",
            "ar": "مكتب 12"
          },
          "area": "145",
          "floor": "2"
        },
        {
          "unitId": 18,
          "name": {
            "en": "Villa 18",
            "ar": "فيلا 18"
          },
          "area": "280",
          "floor": "0"
        },
        {
          "unitId": 19,
          "name": {
            "en": "Office 13",
            "ar": "مكتب 13"
          },
          "area": "236",
          "floor": "3"
        },
        {
          "unitId": 20,
          "name": {
            "en": "Office 14",
            "ar": "مكتب 14"
          },
          "area": "237",
          "floor": "3"
        },
        {
          "unitId": 21,
          "name": {
            "en": "Office 15",
            "ar": "مكتب 15"
          },
          "area": "125",
          "floor": "3"
        },
        {
          "unitId": 22,
          "name": {
            "en": "Office 16",
            "ar": "مكتب 16"
          },
          "area": "141",
          "floor": "3"
        },
        {
          "unitId": 23,
          "name": {
            "en": "Office 17",
            "ar": "مكتب 17"
          },
          "area": "165",
          "floor": "3"
        },
        {
          "unitId": 24,
          "name": {
            "en": "Office 18",
            "ar": "مكتب 18"
          },
          "area": "144",
          "floor": "3"
        },
        {
          "unitId": 25,
          "name": {
            "en": "Office 19",
            "ar": "مكتب 19"
          },
          "area": "85",
          "floor": "4"
        },
        {
          "unitId": 26,
          "name": {
            "en": "Office 20",
            "ar": "مكتب 20"
          },
          "area": "83",
          "floor": "4"
        },
        {
          "unitId": 27,
          "name": {
            "en": "Office 21",
            "ar": "مكتب 21"
          },
          "area": "125",
          "floor": "4"
        },
        {
          "unitId": 28,
          "name": {
            "en": "Office 22",
            "ar": "مكتب 22"
          },
          "area": "147",
          "floor": "4"
        },
        {
          "unitId": 29,
          "name": {
            "en": "Office 23",
            "ar": "مكتب 23"
          },
          "area": "165",
          "floor": "4"
        },
        {
          "unitId": 30,
          "name": {
            "en": "Office 24",
            "ar": "مكتب 24"
          },
          "area": "144",
          "floor": "4"
        },
        {
          "unitId": 31,
          "name": {
            "en": "Office 25",
            "ar": "مكتب 25"
          },
          "area": "85",
          "floor": "5"
        },
        {
          "unitId": 32,
          "name": {
            "en": "Office 26",
            "ar": "مكتب 26"
          },
          "area": "83",
          "floor": "5"
        },
        {
          "unitId": 33,
          "name": {
            "en": "Office 27",
            "ar": "مكتب 27"
          },
          "area": "128",
          "floor": "5"
        },
        {
          "unitId": 34,
          "name": {
            "en": "Annex Office 28",
            "ar": "مكتب 28 ملحق"
          },
          "area": "153",
          "floor": "0"
        },
        {
          "unitId": 35,
          "name": {
            "en": "Annex Office 29",
            "ar": "مكتب 29 ملحق"
          },
          "area": "167",
          "floor": "0"
        },
        {
          "unitId": 36,
          "name": {
            "en": "Annex Office 30",
            "ar": "مكتب 30 ملحق"
          },
          "area": "146",
          "floor": "0"
        },
        {
          "unitId": 37,
          "name": {
            "en": "Annex Office 31",
            "ar": "مكتب 31 ملحق"
          },
          "area": "154",
          "floor": "0"
        },
        {
          "unitId": 38,
          "name": {
            "en": "Annex Office 32",
            "ar": "مكتب 32 ملحق"
          },
          "area": "134",
          "floor": "0"
        }
      ],
      "images": [
        "assets/quds1-1-main.jpg",
        "assets/quds1-2.jpg",
        "assets/quds1-3.jpg",
        "assets/quds1-4.jpg",
        "assets/quds1-5.jpg",
        "assets/quds1-6.jpg",
        "assets/quds1-7.jpg",
        "assets/quds1-8.jpg",
        "assets/quds1-9.jpg",
        "assets/quds1-10.jpg",
        "assets/quds1-11.jpg",
        "assets/quds1-12.jpg",
        "assets/quds1-13.jpg",
      ],
      "image": ""
    },
    {
      id: "project13",
      category: "ongoing",
      name: { en: "The Avenue Square", ar: "أفينيو سكوير" },
      description: {
        en: "",
        ar: ""
      },
      type: { en: "Administrative", ar: "إداري" },
      location: { en: "Al-Masif District", ar: "حي المصيف" },
      locationUrl: "",
      area: "3647",
      stats: { offices: 21, parkings: 115, villas: 0, models: 0, units: 0, exhibitionsShowrooms: 0, floors: 0 },
      "Units": [
        {
          "unitId": 1,
          "name": {
            "en": "Office 01",
            "ar": "مكتب 01"
          },
          "area": "155",
          "floor": "0"
        },
        {
          "unitId": 2,
          "name": {
            "en": "Office 02",
            "ar": "مكتب 02"
          },
          "area": "190",
          "floor": "0"
        },
        {
          "unitId": 3,
          "name": {
            "en": "Office 03",
            "ar": "مكتب 03"
          },
          "area": "165",
          "floor": "0"
        },
        {
          "unitId": 4,
          "name": {
            "en": "Office 04",
            "ar": "مكتب 04"
          },
          "area": "215",
          "floor": "0"
        },
        {
          "unitId": 5,
          "name": {
            "en": "Office 05",
            "ar": "مكتب 05"
          },
          "area": "202",
          "floor": "0"
        },
        {
          "unitId": 6,
          "name": {
            "en": "Office 06",
            "ar": "مكتب 06"
          },
          "area": "147",
          "floor": "0"
        },
        {
          "unitId": 7,
          "name": {
            "en": "Office 07",
            "ar": "مكتب 07"
          },
          "area": "174",
          "floor": "0"
        },
        {
          "unitId": 8,
          "name": {
            "en": "Office 08",
            "ar": "مكتب 08"
          },
          "area": "168",
          "floor": "0"
        },
        {
          "unitId": 9,
          "name": {
            "en": "Office 09",
            "ar": "مكتب 09"
          },
          "area": "177",
          "floor": "1"
        },
        {
          "unitId": 10,
          "name": {
            "en": "Office 10",
            "ar": "مكتب 10"
          },
          "area": "190",
          "floor": "1"
        },
        {
          "unitId": 11,
          "name": {
            "en": "Office 11",
            "ar": "مكتب 11"
          },
          "area": "165",
          "floor": "1"
        },
        {
          "unitId": 12,
          "name": {
            "en": "Office 12",
            "ar": "مكتب 12"
          },
          "area": "215",
          "floor": "1"
        },
        {
          "unitId": 13,
          "name": {
            "en": "Office 13",
            "ar": "مكتب 13"
          },
          "area": "221",
          "floor": "1"
        },
        {
          "unitId": 14,
          "name": {
            "en": "Office 14",
            "ar": "مكتب 14"
          },
          "area": "147",
          "floor": "1"
        },
        {
          "unitId": 15,
          "name": {
            "en": "Office 15",
            "ar": "مكتب 15"
          },
          "area": "174",
          "floor": "1"
        },
        {
          "unitId": 16,
          "name": {
            "en": "Office 16",
            "ar": "مكتب 16"
          },
          "area": "183",
          "floor": "1"
        },
        {
          "unitId": 17,
          "name": {
            "en": "Annex Office 17",
            "ar": "مكتب 17 الملحق"
          },
          "area": "135",
          "floor": "Annex"
        },
        {
          "unitId": 18,
          "name": {
            "en": "Annex Office 18",
            "ar": "مكتب 18 الملحق"
          },
          "area": "174",
          "floor": "Annex"
        },
        {
          "unitId": 19,
          "name": {
            "en": "Annex Office 19",
            "ar": "مكتب 19 الملحق"
          },
          "area": "162",
          "floor": "Annex"
        },
        {
          "unitId": 20,
          "name": {
            "en": "Annex Office 20",
            "ar": "مكتب 20 الملحق"
          },
          "area": "144",
          "floor": "Annex"
        },
        {
          "unitId": 21,
          "name": {
            "en": "Annex Office 21",
            ar: "مكتب 21 الملحق"
          },
          "area": "137",
          "floor": "Annex"
        }
      ],
      images: [
        "assets/masifn-1-main.jpg",
        "assets/masifn-2.jpg",
        "assets/masifn-3.jpg",
        "assets/masifn-4.jpg",
        "assets/masifn-5.jpg",
        "assets/masifn-6.jpg",
        'assets/masifn-7.jpg',
        'assets/masifn-8.jpg',
        'assets/masifn-9.jpg',
        'assets/masifn-10.jpg',
        'assets/masifn-11.jpg',
        'assets/masifn-12.jpg',
        'assets/masifn-13.jpg',
        'assets/masifn-14.jpg',
        'assets/masifn-15.jpg',
        'assets/masifn-16.jpg',
        'assets/masifn-17.jpg',
        'assets/masifn-18.jpg',
        'assets/masifn-19.jpg',
      ],
      image: ""
    },
    {
      id: "project4",
      category: "ongoing",
      name: { en: "Aala Alemar Avenue", ar: "عائلة الإعمار أفنيو" },
      description: { en: "", ar: "" },
      type: { en: "Administrative", ar: "إداري" },
      location: { en: "Al-Falah District", ar: "حي الفلاح" },
      locationUrl: "https://maps.app.goo.gl/8r5CFYFCgUUjZpUF8",
      area: "8353",
      stats: { offices: 30, parkings: 300, villas: 0, models: 0, units: 0, exhibitionsShowrooms: 0, floors: 0 },
      Units: [],
      images: [
        "assets/Al Falah/falah-1-main.jpg",
        "assets/Al Falah/falah-2.jpg",
        "assets/Al Falah/falah-3.jpg",
        "assets/Al Falah/falah-4.jpg",
        "assets/Al Falah/falah-5.jpg",
        "assets/Al Falah/falah-6.jpg",
        "assets/Al Falah/falah-7.jpg",
        "assets/Al Falah/falah-8.jpg",
        "assets/Al Falah/falah-9.jpg"
      ]
    },
    {
      id: "project3",
      category: "ongoing",
      name: { en: "Al Nozha", ar: "النزهة" },
      description: { en: "", ar: "" },
      type: { en: "Administrative", ar: "إداري" },
      location: { en: "Al-Nozha District", ar: "حي النزهة" },
      locationUrl: "https://maps.app.goo.gl/wT4f3zM4zchXsYZW9",
      area: "1,715",
      stats: { offices: 6, parkings: 78, villas: 0, models: 0, units: 0, exhibitionsShowrooms: 2, floors: 0 },
      Units: [],
      images: [
        "assets/Al Nozha/nozha-1-main.jpg",
        "assets/Al Nozha/nozha-2.jpg",
        "assets/Al Nozha/nozha-3.jpg",
        "assets/Al Nozha/nozha-4.jpg",
        "assets/Al Nozha/nozha-5.jpg",
        "assets/Al Nozha/nozha-6.jpg"
      ]
    },
    {
      id: "project2",
      category: "completed",
      name: { en: "Al Narjis 1", ar: "النرجس 1" },
      description: { en: "", ar: "" },
      type: { en: "Commercial", ar: "تجاري" },
      location: { en: "Al-Narjis District", ar: "حي النرجس" },
      locationUrl: "http://google.com/maps?q=24.865398,46.633610",
      area: "8070",
      stats: { offices: 0, parkings: 0, villas: 0, models: 0, units: 24, exhibitionsShowrooms: 0, floors: 0 },
      Units: [
        { unitId: 1, name: { en: "Showroom 1", ar: "معرض 1" }, area: "1730", floor: "0" },
        { unitId: 2, name: { en: "Office 1", ar: "مكتب 1" }, area: "300", floor: "1" },
        { unitId: 3, name: { en: "Office 1", ar: "مكتب 1" }, area: "260", floor: "1" },
        { unitId: 4, name: { en: "Office 2", ar: "مكتب 2" }, area: "260", floor: "1" },
        { unitId: 5, name: { en: "Office 3", ar: "مكتب 3" }, area: "260", floor: "1" },
        { unitId: 6, name: { en: "Office 4", ar: "مكتب 4" }, area: "160", floor: "1" },
        { unitId: 7, name: { en: "Office 5", ar: "مكتب 5" }, area: "210", floor: "1" },
        { unitId: 8, name: { en: "Office 6", ar: "مكتب 6" }, area: "200", floor: "1" },
        { unitId: 9, name: { en: "Office 15", ar: "مكتب 15" }, area: "100", floor: "2" },
        { unitId: 10, name: { en: "Office 16", ar: "مكتب 16" }, area: "200", floor: "2" },
        { unitId: 11, name: { en: "Office 17", ar: "مكتب 17" }, area: "210", floor: "2" },
        { unitId: 12, name: { en: "Office 18", ar: "مكتب 18" }, area: "145", floor: "2" },
        { unitId: 13, name: { en: "Showroom 1", ar: "معرض 1" }, area: "1730", floor: "0" },
        { unitId: 14, name: { en: "Office 8", ar: "مكتب 8" }, area: "200", floor: "1" },
        { unitId: 15, name: { en: "Office 9", ar: "مكتب 9" }, area: "210", floor: "1" },
        { unitId: 16, name: { en: "Office 10", ar: "مكتب 10" }, area: "160", floor: "1" },
        { unitId: 17, name: { en: "Office 11", ar: "مكتب 11" }, area: "300", floor: "1" },
        { unitId: 18, name: { en: "Office 12", ar: "مكتب 12" }, area: "260", floor: "1" },
        { unitId: 19, name: { en: "Office 13", ar: "مكتب 13" }, area: "260", floor: "1" },
        { unitId: 20, name: { en: "Office 14", ar: "مكتب 14" }, area: "260", floor: "1" },
        { unitId: 21, name: { en: "Office 19", ar: "مكتب 19" }, area: "200", floor: "2" },
        { unitId: 22, name: { en: "Office 20", ar: "مكتب 20" }, area: "100", floor: "2" },
        { unitId: 23, name: { en: "Office 21", ar: "مكتب 21" }, area: "210", floor: "2" },
        { unitId: 24, name: { en: "Office 22", ar: "مكتب 22" }, area: "145", floor: "2" }
      ],
      images: [
        "assets/Al Narjis 1/narjis-m-1-main.jpg",
        "assets/Al Narjis 1/narjis-m-2.jpg",
        "assets/Al Narjis 1/narjis-m-3.jpg",
        "assets/Al Narjis 1/narjis-m-4.jpg",
        "assets/Al Narjis 1/narjis-m-5.jpg",
        "assets/Al Narjis 1/narjis-m-6.jpg"
      ]
    },
    {
      id: "project5",
      category: "completed",
      name: { en: "Al Narjis 2", ar: "النرجس 2" },
      description: { en: "", ar: "" },
      type: { en: "Administrative", ar: "إداري" },
      location: { en: "Al-Narjis District", ar: "حي النرجس" },
      locationUrl: "https://www.google.com/maps?q=24.865398,46.633610",
      area: "1850",
      stats: { offices: 10, parkings: 0, villas: 0, models: 0, units: 0, exhibitionsShowrooms: 0, floors: 0 },
      Units: [],
      images: [
        "assets/Al Narjis 2/narjis-o-1-main.jpg",
        "assets/Al Narjis 2/narjis-o-2.jpg",
        "assets/Al Narjis 2/narjis-o-3.jpg",
        "assets/Al Narjis 2/narjis-o-4.jpg"
      ]
    },
    {
      id: "project6",
      category: "completed",
      name: { en: "King Abdullah Tower", ar: "برج الملك عبدالله" },
      description: { en: "", ar: "" },
      type: { en: "Administrative", ar: "إداري" },
      location: { en: "Al-Mughrizat District", ar: "حي المغرزات" },
      locationUrl: "https://maps.app.goo.gl/9jjU4Ez3Rb315DPm6",
      area: "0",
      stats: { offices: 0, parkings: 0, villas: 0, models: 0, units: 0, exhibitionsShowrooms: 0, floors: 0 },
      Units: [],
      images: [
        "assets/Ejada/ejada-1-main.jpg",
        "assets/Ejada/ejada-2.jpg",
        "assets/Ejada/ejada-3.jpg",
        "assets/Ejada/egada-4.jpg"
      ]
    },
    {
      id: "project7",
      category: "completed",
      name: { en: "Binyah", ar: "بنية" },
      description: { en: "", ar: "" },
      type: { en: "Administrative", ar: "إداري" },
      location: { en: "Al-Nada District", ar: "حي الندى" },
      locationUrl: "https://maps.app.goo.gl/4ibW1VPLBmzZFjSx5",
      area: "0",
      stats: { offices: 0, parkings: 0, villas: 0, models: 0, units: 0, exhibitionsShowrooms: 0, floors: 0 },
      Units: [],
      images: [
        "assets/Binyah/binyah-1-main.jpg",
        "assets/Binyah/binyah-2.jpg",
        "assets/Binyah/binyah-3.jpg",
        "assets/Binyah/binyah-4.jpg"
      ]
    },
    {
      id: "project8",
      category: "completed",
      name: { en: "Mitsubishi Electric", ar: "ميتسوبيشي إلكتريك" },
      description: { en: "", ar: "" },
      type: { en: "Administrative", ar: "إداري" },
      location: { en: "Al-Wurud District", ar: "حي الورود" },
      locationUrl: "https://maps.app.goo.gl/F6ptepzNJFS2cv8c6",
      area: "0",
      stats: { offices: 0, parkings: 0, villas: 0, models: 0, units: 0, exhibitionsShowrooms: 0, floors: 0 },
      Units: [],
      images: [
        "assets/Mitsubishi Electric/Mitsubishi-1-main.jpg",
        "assets/Mitsubishi Electric/Mitsubishi-2.jpg",
        "assets/Mitsubishi Electric/Mitsubishi-3.jpg"
      ]
    },
    {
      id: "project14",
      category: "completed",
      name: { en: "Twin Tower 2", ar: "برج التوأم 2" },
      description: { en: "", ar: "" },
      type: { en: "Administrative", ar: "إداري" },
      location: { en: "Al-Mughrizat District", ar: "حي المغرزات" },
      locationUrl: "https://maps.app.goo.gl/BBCJaKDUQATKsRus5",
      area: "0",
      stats: { offices: 0, parkings: 0, villas: 0, models: 0, units: 0, exhibitionsShowrooms: 0, floors: 0 },
      Units: [],
      images: [
        "assets/ttk-1-main.jpg",
        "assets/ttk-2.jpg",
        "assets/ttk-3.jpg",
        "assets/ttk-4.jpg"
      ]
    },
    {
      id: "project16",
      category: "completed",
      name: { en: "Al-Arid Apartments 1", ar: "شقق العارض 1" },
      description: { en: "", ar: "" },
      type: { en: "Residential", ar: "سكني" },
      location: { en: "Al-Arid District", ar: "حي العارض" },
      locationUrl: "https://maps.app.goo.gl/FuRrjmqsUq2APsQf7",
      area: "0",
      stats: { offices: 0, parkings: 0, villas: 0, models: 0, units: 0, exhibitionsShowrooms: 0, floors: 0 },
      Units: [],
      images: [
        "assets/aaridf1-1-main.jpg",
        "assets/aaridf1-2.jpg",
        "assets/aaridf1-3.jpg",
        "assets/aaridf1-4.jpg",
        "assets/aaridf1-5.jpg"
      ]
    },
    {
      id: "project15",
      category: "completed",
      name: { en: "Al-Arid Apartments 2", ar: "شقق العارض 2" },
      description: { en: "", ar: "" },
      type: { en: "Residential", ar: "سكني" },
      location: { en: "Al-Arid District", ar: "حي العارض" },
      locationUrl: "https://maps.app.goo.gl/FuRrjmqsUq2APsQf7",
      area: "0",
      stats: { offices: 0, parkings: 0, villas: 0, models: 0, units: 50, exhibitionsShowrooms: 0, floors: 0 },
      Units: [ ],
      images: [
        "assets/aaridf2-1-main.jpg",
        "assets/aaridf2-2.jpg",
        "assets/aaridf2-3.jpg",
      ]
    },
    {
      id: "project17",
      category: "completed",
      name: { en: " Al-Masif Apartments", ar: "شقق المصيف" },
      description: { en: "", ar: "" },
      type: { en: "Residential", ar: "سكني" },
      location: { en: "Al-Masif District", ar: "حي المصيف" },
      locationUrl: "https://maps.app.goo.gl/C4pERhxF9qBfEypg9",
      area: "0",
      stats: { offices: 0, parkings: 0, villas: 0, models: 0, units: 10, exhibitionsShowrooms: 0, floors: 0 },
      Units: [],
      images: [
        "assets/masif1-1-main.jpg",
        "assets/masif1-2.jpg",
      ]
    },
    {
      id: "project18",
      category: "completed",
      name: { en: "Al-Izdihar 3(othman ibn afan)", ar: "الإزدهار 3 (عثمان بن عفان)" },
      description: { en: "", ar: "" },
      type: { en: "Commercial", ar: "تجاري" },
      location: { en: "Al-Izdihar District", ar: "حي الإزدهار" },
      locationUrl: "https://maps.app.goo.gl/gE8jBctGcQnp8R5r8",
      area: "0",
      stats: { offices: 18, parkings: 0, villas: 0, models: 0, units: 0, exhibitionsShowrooms: 5, floors: 0 },
      Units: [],
      images: [
        "assets/izdihar-1-main.jpg",
        "assets/izdihar-2.jpg",
        "assets/izdihar-3.jpg",
        "assets/izdihar-4.jpg"
      ]
    },
  ];


  setSelectedProject(project: Project): void {
    this.selectedProject = project;
  }

  getSelectedProject(): Project | null {
    return this.selectedProject;
  }

  getAllProjects(): Project[] {
    return this.projects;
  }

  getProjectById(id: string): Project | undefined {
    return this.projects.find(p => p.id === id);
  }
}
