# char

1. **'a' -> 'b'**

   ```java
   char a = 'a';
   char b = (char) (a + 1); // 将 'a' 的数值加 1 得到 'b' 的数值
   
   System.out.println(b); // 输出：b
   ```

2. **'1' -> 1**

   ```java
   char charNumber = '1';
   int number = charNumber - '0'; // 将字符 '1' 转换为数值 1
   System.out.println(number); // 输出：1
   ```

3. **1 -> '1'**

   ```java
   int number = 1;
   char character = (char) (number + '0');
   
   System.out.println(character); // 输出：'1'
   ```

   

