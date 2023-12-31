/**
 * zipcloudから住所情報を取得する
 */
export const onFetchAddress = (postcode, setAddress, setValue) => {
  // console.log(getValues());

  const zipcloudURL = "https://zipcloud.ibsnet.co.jp/api/search?zipcode=";

  // ポストコードを取得
  // const postcode = getValues("postcode");

  // 存在チェック
  if (!postcode) {
    console.log("ポストコードが空！処理終了！");
    return;
  }

  // - があれば除去
  const formattedZipcode = String(postcode).replace(/-/g, "");

  // API通信するURLを作成
  const url = `${zipcloudURL}${formattedZipcode}`;

  // API通信
 fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("取得した住所:", data.results);

      // 取得した住所を設定
      setAddress(data.results);

      // フォームの値を更新
      setValue("prefectures", data.results[0].address1);
      setValue("city", data.results[0].address2);
      setValue("town", data.results[0].address3);

      // return {
      //   pref: data.results[0].address1,
      //   city: data.results[0].address2,
      //   town: data.results[0].address3,
      // };
    })

    // エラーの場合
    .catch((error) => {
      console.error("エラーがあります！:", error);
    });
};
