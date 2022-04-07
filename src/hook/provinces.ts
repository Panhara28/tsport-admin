import provinceJSON from "../data/provinces.json";
import districtJSON from "../data/district.json";
import communeJSON from "../data/communes.json";
import villageJSON from "../data/villages.json";

export const getProvince = () => {
  return provinceJSON.provinces.map((item: any) => {
    return {
      label: item.name_kh,
      value: item.code,
    };
  });
};

export const getDistrict = (province: string | undefined) => {
  const districts = districtJSON.district;

  if (province) {
    let reg: any;

    let provinceCommunes;
    reg = new RegExp(`^${province}`, "i");
    provinceCommunes = districts.filter((item) => reg.test(item.code));

    return provinceCommunes.map((item) => {
      return {
        label: item.name_kh,
        value: item.code,
      };
    });
  } else {
    return districts.map((item) => {
      return {
        label: item.name_kh,
        value: item.code,
      };
    });
  }
};

export const getCommune = (district: string | undefined) => {
  const communes = communeJSON.communes;

  if (district) {
    let reg: any;

    let provinceCommunes;
    reg = new RegExp(`^${district}`, "i");
    provinceCommunes = communes.filter((item) => reg.test(item.code));

    return provinceCommunes.map((item) => {
      return {
        label: item.name_kh,
        value: item.code,
      };
    });
  } else {
    return communes.map((item) => {
      return {
        label: item.name_kh,
        value: item.code,
      };
    });
  }
};

export const getVillage = (commune: string | undefined) => {
  const villages = villageJSON.villages;

  if (commune) {
    let reg: any;

    let provinceCommunes;
    reg = new RegExp(`^${commune}`, "i");
    provinceCommunes = villages.filter((item) => reg.test(item.code));

    return provinceCommunes.map((item) => {
      return {
        label: item.name_kh,
        value: item.code,
      };
    });
  } else {
    return villages.map((item) => {
      return {
        label: item.name_kh,
        value: item.code,
      };
    });
  }
};
