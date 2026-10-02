#String Brack
str1 = "since 2007 tesla outsourcing Services has grown through a series of deliberate"
print(str1)
ch = str1[12]
print (ch)
#String Slicing
print(str1[4:12])
print(str1[4:len(str1)])
print(str1[4:])
print(str1[:10])
# Nagative Start in Last Text
print(str1[-12:-1])
# Check The Last Word Same or not
print(str1.endswith("rate"))
print(str1.capitalize())
print(str1.replace("a", "D"))
print(str1.replace("tesla", "Dev"))
print(str1.find("tesla"))
#Counde The Word in Text
print(str1.count("tesla"))

# name = input("write a Name")
# print ("Name Length = ", len(name))

# Make A IF ELSe Make Condition page function
marks = int(input("Enter Your Number"))

if(marks >= 90):
    grade = "A"
elif(marks >= 80 and marks < 90):
    grade = "B"
elif(marks >= 70 and marks < 80):
    grade = "C"
else:
    grade ="D"

print ("Your Grade", grade)

# Nesting IF Else
age = 95

if (age >= 18):
    if(age >= 80):
        print("Cannot Drive")
    else:
        print("Can Drive")
else:
    print("Cannot Drive")

#Task
num01 = int(input("Write The Number ODD Or EVEN"))

if(num01 % 2 == 0):
    print("Number is ODD")
else:
    print("Number is EVEN")


a1 = int(input("Enter First Number: "))
b1 = int(input("Enter Second Number: "))
c1 = int(input("Enter Third Number: "))

if (a1 >= b1 and a1 >= c1 ):
    print("First is Largest", a1)
elif (b1 >= c1 ):
    print("Second is Largest", b1)
else:
    print("Third is Largest", c1)

multi = int(input("Write the number to check it is 7 to multiple"))

if(multi % 2 == 0):
    print("7 to multiple")
else:
    print("7 to Not multiple")
