import requests
from bs4 import BeautifulSoup
from typing import Dict, Any

def scrape_wikipedia(url: str) -> Dict[str, Any]:
    headers = {
        'User-Agent': 'Mozilla/5.0 (WikiQuizBot/1.0; Educational Project)'
    }

    response = requests.get(url, headers=headers, timeout=15)
    response.raise_for_status()

    raw_html = response.text
    soup = BeautifulSoup(raw_html, 'lxml')

    title_tag = soup.find('h1', {'id': 'firstHeading'})
    title = title_tag.get_text(strip=True) if title_tag else 'Unknown Title'

    content_div = soup.find('div', {'id': 'mw-content-text'})
    if not content_div:
        raise ValueError('Could not find main content on this page')

    for tag in content_div.find_all(['table', 'sup', 'div']):
        try:
            tag_classes = tag.get('class')
            if tag_classes:  # Check if not None
                if any(c in ['reflist', 'navbox', 'hatnote', 'thumb'] for c in tag_classes):
                    tag.decompose()
        except (AttributeError, TypeError):
            continue

    sections = []
    for h2 in content_div.find_all('h2'):
        try:
            text = h2.get_text(strip=True).replace('[edit]', '')
            if text and text not in ['See also', 'References', 'External links',
                                      'Notes', 'Bibliography', 'Further reading']:
                sections.append(text)
        except (AttributeError, TypeError):
            continue

    paragraphs = content_div.find_all('p')
    summary_parts = []
    for p in paragraphs[:8]:
        try:
            text = p.get_text(strip=True)
            if len(text) > 100:
                summary_parts.append(text)
            if len(summary_parts) >= 3:
                break
        except (AttributeError, TypeError):
            continue
    summary = ' '.join(summary_parts)

    all_paragraphs = []
    for p in paragraphs:
        try:
            text = p.get_text(strip=True)
            if len(text) > 50:
                all_paragraphs.append(text)
        except (AttributeError, TypeError):
            continue
    full_text = '\n\n'.join(all_paragraphs[:50])

    return {
        'title': title,
        'summary': summary,
        'sections': sections,
        'full_text': full_text,
        'raw_html': raw_html[:50000],
    }