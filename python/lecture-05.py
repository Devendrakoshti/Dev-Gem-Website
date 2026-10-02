# Loop

count = 1
while count <=5 :
    print("Hello World")
    count = count + 1

# Print A number from 1 to 10
i = 1
while i <= 100:
    print(i)
    i += 1

x = 100

while x >= 1:
    print(x)
    x -= 1
# Print A Table
n = int(input("Enter a number to print its table: "))
y = 1
while y <= 10:
    print(y*n)
    y +=1

# Print a Number of List
numb = [1,4,9,16,25,36,49,64,81,100]
idx = 0
print(len(numb))
while idx < len(numb):
    print(numb[idx])
    idx += 1

numb2 = (1,4,9,16,25,36,49,64,81,100)
x = 36
t = 0
while t < len(numb2):
    if (numb2[t] == x):
        print("Number found at index", t)
        
    t += 1
else:
    print("Number not found")
