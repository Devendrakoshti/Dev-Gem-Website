# Libery
info = {
    "key" : "value",
    "name" : "dev",
    "learning" : ["python","C++","java"],
    "age" : 20,

}
print  (info)
print(type(info))
print(info["learning"])
# Change The Value
info["age"] = 21    
print(info["age"])

# Nested Dictionary
student ={
    "name" : "dev",
    "subject" : {
        "phy" : 97,
        "chem" : 98,
        "math" : 99
    }

}
print(student)
print(student["subject"]["math"])
print(student.keys())
print(student.values())
print(student.items())
print(student.get("name2")) #no error - None
student.update({"city": "New York"})
print(student)

# Set 
colection = {1,2,3,4,5,6,7,8,9,8,8,"hello","bye"}
print(colection)
print(type(colection))
print(len(colection))
collection1 = set() #MT SET
collection1.add(1)
collection1.add(2)
collection1.add(3)
collection1.add("Tesla")
collection1.add((("Tesla","Elon")))
print(collection1)
collection1.clear()
print(len(collection1))
collection2 = {"hello","bye","hello","bye", "code"}
collection3 = {"hello","bye","hello","bye", "code"}
collection2.pop()
print(collection2)


set1 = {1,2,3,4,5}
set2 = {4,5,6,7,8}
print(set1.union(set2))
print(set1.intersection(set2))
print(len(collection3))


# Task
marks ={}

x = int(input("Math: "))
marks.update({"Math": x})
x = int(input("Physics: "))
marks.update({"Physics": x})
x = int(input("Chemistry: "))
marks.update({"Chemistry": x})
print(marks)
