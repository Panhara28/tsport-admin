/* eslint-disable @typescript-eslint/ban-ts-comment */
import FormData from 'form-data';

export async function restapiupload(file: File) {
  try {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'Bearer $2a$12$mbZDMo/pB/Eh0vIKhpOdsODiDY7XzePfuXRoHus/HKBhfM99aUTCS');

    const formdata = new FormData();

    formdata.append('mocspace', file, file.name);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    const res = await fetch('https://s2.tsportcambodia.com/upload', requestOptions as any);

    const json = await res.json();

    return json;
  } catch (err) {
    console.log(err);
  }
}
