export type RequestOption = {
  url: string;
  params?: any;
  idToken?: string;
};

export type Response<T> = {
  data: T;
  status: number;
};

const handleError = async (error: any) => {
  if (!error || !error.status) {
    return { message: "インターネットに接続されていません。", original: error };
  }
  const data = await error.json();
  const errorMessage = !!data.message
    ? !data.message?.match(/^[a-zA-Z0-9!-/:-@¥[-`{-~\s]+$/)
    : false;
  const isUserFriendlyMessage = !error.statusText.match(
    /^[a-zA-Z0-9!-/:-@¥[-`{-~\s]+$/
  );
  const message = errorMessage
    ? data.message
    : isUserFriendlyMessage
    ? error.statusText
    : error.status === 403
    ? `アクセスが制限されています。アクセス可能な環境から接続してください`
    : `問題が発生しました。時間を置いて再度お試しください。`;
  return {
    message,
    original: error,
  };
};

export const requestGet = async <Data>(
  option: RequestOption
): Promise<Response<Data>> => {
  const { url, params } = option;
  const query_params = new URLSearchParams(params);

  return await fetch(`${url}${query_params}`, {
    method: "GET",
  })
    .then(async (response) => {
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      return {
        data: data,
        status: response.status,
      };
    })
    .catch(async (error) => {
      throw await handleError(error);
    });
};
