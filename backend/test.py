import requests

url = "http://127.0.0.1:5000/api/books"
response = requests.get(url)

if response.status_code == 200:
    print("Books data retrieved successfully!")
    print(response.json())  # This will print the JSON response from the API
else:
    print("Failed to retrieve books")
    print(response.status_code)
