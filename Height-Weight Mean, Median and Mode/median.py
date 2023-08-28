import csv
#method to read csv file and to keep in a list form
with open('height-weight.csv',newline='') as f:
    reader = csv.reader(f)
    fileData = list(reader)
#print(fileData)
#pop is used to remove somthing
#push is used to insert something
fileData.pop(0)
newData = []

for i in range(len(fileData)):
    #when we write two arrays first array represents row second array represents columns
    n_num = fileData[i][1]
    #float stands for decimal values
    #append is used to insert/add number to list
    newData.append(float(n_num))

n = len(newData)
newData.sort()
if n%2 == 0:
    #we use // to get floor value (rounded value but lower val)
    median1 = float(newData[n//2])
    median2 = float(newData[n//2-1])
    median = (median1+median2)/2
else:
    median=newData[n//2]

print(median)