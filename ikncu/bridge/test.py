import os, glob, time
root = 'c:/tmp/corvid/*.*'

files = glob.glob(root)
files.sort(key=os.path.getmtime)
print("\n".join(files))

# date_file_list = []
# for folder in glob.glob(root):
#     for file in glob.glob('c:/tmp/corvid/*.*'):
#         stats = os.stat(file)
#         lastmod_date = time.localtime(stats[8])
#         date_file_tuple = lastmod_date, file
#         date_file_list.append(date_file_tuple)
#
# date_file_list.sort()
# date_file_list.reverse()  # newest mod date now first
#
# for file in date_file_list:
#     folder, file_name = os.path.split(file[1])
#     file_date = time.strftime("%m/%d/%y %H:%M:%S", file[0])
#     print("%-40s %s" % (file_name, file_date))