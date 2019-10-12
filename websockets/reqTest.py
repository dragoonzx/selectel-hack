import pickle
obj = ['asnfklqnfkl', 'sadnld', 'asndlas', 'gkfmr']
x = pickle.dumps(obj)
obj1 = pickle.loads(x)
print(obj1)