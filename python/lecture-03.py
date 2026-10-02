#List is "mutable" Value changeble
#tuple is "immutable" Value dont changeble
list = [1,2,3,4,5,6,8]
list2 = ["a","g","r","s","u","h"]
list.append(7)
list.sort()
print(list)
list.sort(reverse=True)
print(list)
list2.sort(reverse=True)
list2.reverse()
print(list2)
list.insert(8,9)
print(list)

tup = (1,5,8,6,8,8,8,)
print (tup.index(8))
print (tup.count(8))
print(type(tup))

# Task
movies = [] 
movie1 = input("Movie 01 = ")
movie2 = input("Movie 02 = ")
movie3 = input("Movie 03 = ")

movies.append(movie1)
movies.append(movie2)
movies.append(movie3)

print(movies)

names = []
names.append(input("Name 01 = "))
names.append(input("Name 02 = "))

print(names)

listing1 = [1,2,3]

copy_list = listing1.copy()
copy_list.reverse() 

if (copy_list == listing1):
    print("Palindrome")
else:
    print("Not Palindrome")