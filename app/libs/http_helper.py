import requests
from requests import Response


class HTTP:
    @staticmethod
    def get(url, return_json=True):
        r: Response = requests.get(url)

        if r.status_code != 200:
            return {} if return_json else ''

        if return_json:
            try:
                return r.json()
            except requests.exceptions.JSONDecodeError:
                return {}
        else:
            return r.text