import dropbox

class TransferData:
    def __init__(self, access_token):
        self.access_token = access_token

    def upload_file(self, file_from, file_to):
        """upload a file to Dropbox
        """
        dbx = dropbox.Dropbox(self.access_token)

        with open(file_from, 'rb') as f:
            dbx.files_upload(f.read(), file_to)

def main():
    access_token = input("Enter Dropbox Access Token: ")
    transferData = TransferData(access_token)

    file_from = input("Enter File Path on PC : ")
    file_to = input("ENter File Path in Dropbox : ")

    transferData.upload_file(file_from, file_to)

if __name__ == '__main__':
    main()
