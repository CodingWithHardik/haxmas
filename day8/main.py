from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Chrome()
driver.get("https://ozh.github.io/cookieclicker/")
time.sleep(10)

cookie = driver.find_element(By.ID,"bigCookie")

def click_golden():
    try:
        gold = driver.find_elements(By.CLASS_NAME,"shimmer")
        for g in gold:
            g.click()
    except:
        pass

try:
    cycle = 0
    while True:
        cycle += 1

        for _ in range(50):
            cookie.click()
            time.sleep(0.03)

        click_golden()

        buildings = driver.find_elements(By.CLASS_NAME,"product")
        for b in reversed(buildings):
            try:
                b.click()
            except:
                pass

        cps = driver.find_element(By.ID,"cookies").text
        print("Cycle",cycle,"Status",cps)

        time.sleep(1)

except KeyboardInterrupt:
    print("Bot stopped")

finally:
    driver.quit()
