/* eslint-disable @typescript-eslint/ban-ts-comment */
import FormData from 'form-data';

export async function restapiupload(file: File) {
  try {
    const formData = new FormData();

    formData.append('mocspace', file, file.name);

    const res = await fetch('https://s2.tsportcambodia.com/upload', {
      method: 'POST',
      headers: {
        authorization: 'Bearer $2a$12$mbZDMo/pB/Eh0vIKhpOdsODiDY7XzePfuXRoHus/HKBhfM99aUTCS',
      },
      body: JSON.stringify(formData),
    });

    const json = await res.json();

    return json;
  } catch (err) {
    console.log(err);
  }
}
